<div align="center">

<img src="client/public/logo.png" alt="IberiaHub" width="80" height="80">

# IberiaHub Notícias

**Counter-Strike news platform for the Iberian community (PT + ES).**  
Fast, clear, and built for people who follow CS every day.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Quick Start](#quick-start) • [Stack](#stack) • [Structure](#structure) • [Deploy](#deployment)

</div>

---

## What it is

A curated CS news site with simple editorial structure and solid technical foundation.  
Built to grow without becoming chaos.

---

## Who it's for

- Players and fans in Portugal and Spain
- Content creators and amateur teams
- Esports projects that need real visibility

---

## What it does (today)

```
📰  Story publishing with custom CMS
🔎  Organization by category / theme
⚡  Fast, lightweight frontend
🔐  Separate admin area
🎯  Live match tracking
📊  Editorial briefings
```

---

## Why it's different

**Iberian focus, not generic**  
Covers the scene that matters to PT/ES communities, not just tier-1 international.

**Less noise, more context**  
Editorial structure: *What happened* + *Why it matters*. No clickbait.

**Built to scale**  
Not just "posting news" — structure designed for multi-user, roles, and growth.

---

## Stack

### Core
```
Frontend   React 19 + TypeScript + Vite
Backend    Node.js + Express
Validation Zod (runtime type safety)
State      TanStack Query
Styling    Tailwind CSS 4
Animation  Framer Motion
```

### Architecture
```
client/    Frontend (9 pages, 65+ components)
server/    Backend (13 REST endpoints)
shared/    Common schemas and types

Separated by concern, connected by type safety.
No monolithic mess.
```

---

## Quick Start

```bash
git clone https://github.com/Hugomelo123/iberiahubnoticias.git
cd iberiahubnoticias
pnpm install
PORT=8081 pnpm dev
```

**Admin access:** `http://localhost:8081/admin` (password: `iberia2026`)

---

## Structure

### Frontend (`client/`)
```
src/
├── pages/              9 routes
│   ├── noticias.tsx    Homepage feed
│   ├── article.tsx     Story detail
│   ├── agenda.tsx      Match broadcast center
│   └── admin.tsx       CMS panel
│
├── components/
│   ├── editorial/      Domain components
│   └── ui/             50+ Shadcn components
│
└── lib/
    ├── api.ts          REST client
    └── utils.ts        Helpers
```

### Backend (`server/`)
```
routes.ts    13 REST endpoints (public + protected)
storage.ts   Data layer (in-memory → PostgreSQL)
index.ts     Express setup
vite.ts      Dev server integration
```

### Shared (`shared/`)
```
schema.ts    Zod schemas + TypeScript types
             Used by both frontend and backend
```

---

## API

### Public
```http
GET  /api/stories              List all stories
GET  /api/stories/:slug        Single story
GET  /api/matches              Match schedule
GET  /api/briefings            Quick news
POST /api/auth/login           Authentication
```

### Protected (JWT required)
```http
POST   /api/stories            Create
PUT    /api/stories/:id        Update
DELETE /api/stories/:id        Delete
POST   /api/matches            Create match
PUT    /api/matches/:id        Update match
DELETE /api/matches/:id        Remove match
POST   /api/briefings          Add briefing
DELETE /api/briefings/:id      Remove briefing
```

---

## Deployment

### Current state
```
Development   ✅ Fully functional
Production    ⚠️  Requires PostgreSQL migration
Storage       In-memory (ephemeral)
```

### Recommended: Railway
```bash
1. Push to GitHub (done)
2. railway.app → New Project → Deploy from GitHub
3. Add PostgreSQL service
4. Set environment variables
5. Deploy (automatic)
```

### Environment variables
```env
DATABASE_URL=postgresql://...
AUTH_PASSWORD=your_secure_password
AUTH_TOKEN=your_jwt_secret
PORT=8081
NODE_ENV=production
```

Full guide: [GUIA_DEPLOY.md](GUIA_DEPLOY.md)

---

## Documentation

```
DOCUMENTACAO_COMPLETA.md    Full architecture (27k words)
CODIGOS_COMPLETOS.md        Code reference (all key files)
GUIA_DEPLOY.md              Production deployment guide
RELATORIO_TESTES.md         Test report + checklist
CONTRIBUTING.md             How to contribute
```

---

## Roadmap

### v5.0 (current)
- [x] REST API backend (13 endpoints)
- [x] React 19 frontend (9 pages)
- [x] JWT authentication
- [x] Full CRUD for stories/matches/briefings
- [x] Admin CMS panel
- [x] Editorial design system

### v6.0 (planned)
- [ ] PostgreSQL migration
- [ ] Multi-user with roles
- [ ] Image upload system
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] PWA support

---

## Contributing

PRs welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Use [Conventional Commits](https://www.conventionalcommits.org/).

---

## Numbers

```
Dependencies       81
Lines of code      3,300+
Documentation      35k words
API endpoints      13
Pages             9
Components        65+
```

---

## License

MIT License - see [LICENSE](LICENSE)

---

## Contact

- **Issues:** [github.com/Hugomelo123/iberiahubnoticias/issues](https://github.com/Hugomelo123/iberiahubnoticias/issues)
- **Email:** contact@iberiahub.com

---

<div align="center">

**Built for the Iberian Counter-Strike community**

*Version 5.0.0 • January 2026*

</div>
