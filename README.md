# IberiaHub Notícias

Portal de notícias de Counter-Strike para a comunidade ibérica (PT + ES).  
Rápido, limpo, editorial.

---

## O que é

Site de notícias CS com CMS próprio. Estrutura editorial simples e base técnica sólida.  
Criado para crescer sem virar caos.

---

## Para quem

- Jogadores e fãs de CS em Portugal e Espanha
- Criadores de conteúdo e equipas
- Projetos de esports que precisam de visibilidade

---

## O que faz

```
📰  Notícias com CMS completo
🔎  Organização por categorias
⚡  Frontend rápido e leve
🔐  Admin panel separado
🎯  Agenda de jogos ao vivo
📊  Briefings editoriais
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

Estrutura: `client/` `server/` `shared/`

---

## Quick Start

```bash
git clone https://github.com/Hugomelo123/iberiahubnoticias.git
cd iberiahubnoticias
pnpm install
PORT=8081 pnpm dev
```

Abrir: `http://localhost:8081/noticias`

**Admin:** `/admin` com password `iberia2026`

---

## Estrutura

```
client/src/
├── pages/           9 páginas
├── components/      65+ componentes
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

### Público
```
GET  /api/stories
GET  /api/stories/:slug
GET  /api/matches
GET  /api/briefings
POST /api/auth/login
```

### Protegido
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

**Atual:** In-memory storage (temporário)  
**Produção:** Migrar para PostgreSQL

### Railway (recomendado)
```
1. Push para GitHub
2. railway.app → New Project
3. Add PostgreSQL
4. Deploy automático
```

### Env vars necessárias
```env
DATABASE_URL=postgresql://...
AUTH_PASSWORD=***
AUTH_TOKEN=***
PORT=8081
NODE_ENV=production
```

Ver `GUIA_DEPLOY.md` para detalhes.

---

## Docs

```
DOCUMENTACAO_COMPLETA.md    Arquitetura completa
CODIGOS_COMPLETOS.md        Código de referência
GUIA_DEPLOY.md              Deploy passo-a-passo
RELATORIO_TESTES.md         Testes e checklist
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

**Versão:** 5.0.0  
**Pronto:** 85%

---

## Licença

Proprietário © 2026 IberiaHub

---

**Feito para a comunidade CS ibérica**

*Janeiro 2026*
