import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertStorySchema, insertMatchSchema, insertBriefingSchema } from "@shared/schema";
import jwt from "jsonwebtoken";

// JWT secret - usar variável de ambiente em produção
const JWT_SECRET = process.env.JWT_SECRET || "iberia-hub-secret-2026-change-in-production";

// Gerar token JWT para utilizador
function generateToken(userId: string, username: string): string {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "7d" });
}

// Verificar token JWT
function verifyToken(token: string): { userId: string; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
  } catch {
    return null;
  }
}

function requireAuth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  req.user = decoded;
  next();
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  
  // ============ AUTH ============
  app.post("/api/auth/login", async (req, res) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password obrigatória" });
    }

    const user = await storage.getUserByPassword(password);
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = generateToken(user.id, user.username);

    res.json({
      success: true,
      token,
      user: { username: user.username }
    });
  });

  // ============ STORIES (PUBLIC) ============
  app.get("/api/stories", async (req, res) => {
    const stories = await storage.getAllStories();
    res.json(stories);
  });

  app.get("/api/stories/:slug", async (req, res) => {
    const story = await storage.getStoryBySlug(req.params.slug);
    if (!story) {
      return res.status(404).json({ error: "Story não encontrada" });
    }
    res.json(story);
  });

  // ============ STORIES (PROTECTED) ============
  app.post("/api/stories", requireAuth, async (req, res) => {
    try {
      const data = insertStorySchema.parse(req.body);
      const story = await storage.createStory(data);
      res.status(201).json(story);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/stories/:id", requireAuth, async (req, res) => {
    const story = await storage.updateStory(req.params.id, req.body);
    if (!story) {
      return res.status(404).json({ error: "Story não encontrada" });
    }
    res.json(story);
  });

  app.delete("/api/stories/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteStory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Story não encontrada" });
    }
    res.json({ success: true });
  });

  // ============ MATCHES (PUBLIC) ============
  app.get("/api/matches", async (req, res) => {
    const matches = await storage.getAllMatches();
    res.json(matches);
  });

  // ============ MATCHES (PROTECTED) ============
  app.post("/api/matches", requireAuth, async (req, res) => {
    try {
      const data = insertMatchSchema.parse(req.body);
      const match = await storage.createMatch(data);
      res.status(201).json(match);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/matches/:id", requireAuth, async (req, res) => {
    const match = await storage.updateMatch(req.params.id, req.body);
    if (!match) {
      return res.status(404).json({ error: "Match não encontrado" });
    }
    res.json(match);
  });

  app.delete("/api/matches/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteMatch(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Match não encontrado" });
    }
    res.json({ success: true });
  });

  // ============ BRIEFINGS (PUBLIC) ============
  app.get("/api/briefings", async (req, res) => {
    const briefings = await storage.getAllBriefings();
    res.json(briefings);
  });

  // ============ BRIEFINGS (PROTECTED) ============
  app.post("/api/briefings", requireAuth, async (req, res) => {
    try {
      const data = insertBriefingSchema.parse(req.body);
      const briefing = await storage.createBriefing(data);
      res.status(201).json(briefing);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/briefings/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteBriefing(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Briefing não encontrado" });
    }
    res.json({ success: true });
  });

  // ============ MAINTENANCE MODE (PROTECTED) ============
  app.get("/api/maintenance", async (req, res) => {
    const enabled = await storage.getMaintenanceMode();
    res.json({ enabled });
  });

  app.post("/api/maintenance", requireAuth, async (req, res) => {
    const { enabled } = req.body;
    if (typeof enabled !== "boolean") {
      return res.status(400).json({ error: "enabled deve ser boolean" });
    }
    await storage.setMaintenanceMode(enabled);
    res.json({ success: true, enabled });
  });

  return httpServer;
}
