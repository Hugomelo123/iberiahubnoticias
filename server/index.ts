import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testConnection, initializeDatabase } from "./db";
import path from "path";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    limit: '10mb', // Suporta imagens base64
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Servir ficheiros estáticos da pasta attached_assets
  const attachedAssetsPath = path.resolve(__dirname, "..", "attached_assets");
  app.use("/attached_assets", express.static(attachedAssetsPath, {
    maxAge: "1d", // Cache de 1 dia para imagens
    etag: true,
  }));

  // Inicializar banco de dados
  const dbConnected = await testConnection();
  if (dbConnected) {
    await initializeDatabase();
  }

  // Middleware de manutenção - ANTES das rotas para bloquear API
  app.use(async (req, res, next) => {
    // Importar storage dinamicamente para evitar circular dependency
    const { storage } = await import("./storage");
    const maintenanceMode = await storage.getMaintenanceMode();

    // Permitir sempre: admin, API de auth, API de manutenção, assets
    const allowedPaths = [
      '/admin',
      '/api/auth',
      '/api/maintenance',
      '/attached_assets',
      '/logo.png'
    ];

    const isAllowed = allowedPaths.some(p => req.path.startsWith(p));

    // Se em manutenção e não é uma rota permitida
    if (maintenanceMode && !isAllowed) {
      // Para chamadas API, retornar JSON 503
      if (req.path.startsWith('/api')) {
        return res.status(503).json({
          error: "Site em manutenção",
          message: "O site está temporariamente indisponível para manutenção. Tente novamente em breve."
        });
      }
      // Para páginas HTML, deixar passar (front-end redireciona)
    }

    next();
  });

  const routes = await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
