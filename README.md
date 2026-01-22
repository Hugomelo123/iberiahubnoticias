# IberiaHub Notícias

Counter-Strike news platform for the Iberian community (PT + ES).  
Fast, clean, editorial.

---

## What it is

CS news site with custom CMS. Simple editorial structure and solid technical foundation.  
Built to grow without becoming chaos.

---

## Who it's for

- CS players and fans in Portugal and Spain
- Content creators and teams
- Esports projects that need visibility

---

## What it does

```
📰  News with complete CMS
🔎  Organization by categories
⚡  Fast and lightweight frontend
🔐  Separate admin panel
🎯  Live match schedule
📊  Editorial briefings
```

---

## Stack

```
Frontend   React 19 + TypeScript + Vite
Backend    Node.js + Express
State      TanStack Query
Style      Tailwind CSS 4 + Shadcn UI
Animation  Framer Motion
```

Structure: `client/` `server/` `shared/`

---

## Quick Start

```bash
git clone https://github.com/Hugomelo123/iberiahubnoticias.git
cd iberiahubnoticias
pnpm install
PORT=8081 pnpm dev
```

Open: `http://localhost:8081/noticias`

**Admin:** `/admin` with password `iberia2026`

---

## Structure

```
client/src/
├── pages/           9 pages
├── components/      65+ components
└── lib/             API client

server/
├── routes.ts        13 endpoints
├── storage.ts       Data layer
└── index.ts         Setup

shared/
└── schema.ts        Zod schemas
```

---

## API

### Public
```
GET  /api/stories
GET  /api/stories/:slug
GET  /api/matches
GET  /api/briefings
POST /api/auth/login
```

### Protected
```
POST   /api/stories
PUT    /api/stories/:id
DELETE /api/stories/:id
POST   /api/matches
PUT    /api/matches/:id
DELETE /api/matches/:id
POST   /api/briefings
DELETE /api/briefings/:id
```

---

## Deploy

**Current:** In-memory storage (temporary)  
**Production:** Migrate to PostgreSQL

### Railway (recommended)
```
1. Push to GitHub
2. railway.app → New Project
3. Add PostgreSQL
4. Auto deploy
```

### Required env vars
```env
DATABASE_URL=postgresql://...
AUTH_PASSWORD=***
AUTH_TOKEN=***
PORT=8081
NODE_ENV=production
```

See `GUIA_DEPLOY.md` for details.

---

## Docs

```
DOCUMENTACAO_COMPLETA.md    Complete architecture
CODIGOS_COMPLETOS.md        Code reference
GUIA_DEPLOY.md              Deploy step-by-step
RELATORIO_TESTES.md         Tests and checklist
```

---

## Status

```
Dependencies       81
Lines of code      3,300+
Pages             9
Components        65+
API endpoints     13
```

**Version:** 5.0.0  
**Ready:** 85%

---

## License

Proprietary © 2026 IberiaHub

---

**Built for the Iberian CS community**

*January 2026*
