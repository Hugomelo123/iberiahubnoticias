# 🎮 IberiaHub Notícias V5.0

**A Curadoria Definitiva do CS Ibérico**

Portal de notícias editorial premium para Counter-Strike 2 focado no cenário português e espanhol. Built with React 19, Express, TypeScript e Framer Motion.

---

## ✨ Features

- 🎨 **Design Editorial Premium** - Interface minimalista inspirada em revistas
- ⚡ **Real-time Updates** - Sistema de briefings e live matches
- 🔐 **Admin Panel** - CMS completo para edição de conteúdo
- 📱 **Fully Responsive** - Otimizado para mobile, tablet e desktop
- 🎭 **Smooth Animations** - Transições fluidas com Framer Motion
- 📊 **Broadcast Center** - Página dedicada para agenda de jogos

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Wouter** - Lightweight routing
- **Framer Motion** - Animations
- **TanStack Query** - Data fetching
- **Tailwind CSS 4** - Styling
- **Shadcn UI** - Component library

### Backend
- **Express** - Web server
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **In-memory Storage** - Temporary data layer (migrate to PostgreSQL for production)

### Build & Dev
- **Vite** - Fast dev server & bundler
- **pnpm** - Package manager
- **esbuild** - Fast compiler

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20.x ou superior
- pnpm 10.x

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Hugomelo123/iberiahubnoticias.git
cd iberiahubnoticias

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
PORT=8081 pnpm dev
```

Abrir [http://localhost:8081/noticias](http://localhost:8081/noticias)

### Credenciais Admin
- **URL:** `/admin`
- **Password:** `iberia2026`

---

## 📁 Estrutura do Projeto

```
IberiaHub-Noticias/
├── client/              # Frontend React
│   ├── src/
│   │   ├── pages/      # 9 páginas
│   │   ├── components/ # Componentes UI
│   │   └── lib/        # API client & utils
│   └── public/         # Assets estáticos
├── server/             # Backend Express
│   ├── routes.ts       # 13 API endpoints
│   ├── storage.ts      # Data layer
│   └── index.ts        # Server setup
├── shared/             # Código partilhado
│   └── schema.ts       # Zod schemas
└── docs/               # Documentação
```

---

## 🌐 Páginas

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/noticias` | Homepage com feed | ❌ |
| `/noticias/:slug` | Artigo individual | ❌ |
| `/agenda` | Agenda completa de jogos | ❌ |
| `/admin` | Painel de administração | ✅ |
| `/login` | Login | ❌ |
| `/privacidade` | Política de privacidade | ❌ |
| `/termos` | Termos de serviço | ❌ |
| `/redacao` | Sobre a redação | ❌ |

---

## 🔌 API Endpoints

### Públicos
- `GET /api/stories` - Listar todas as stories
- `GET /api/stories/:slug` - Story por slug
- `GET /api/matches` - Listar matches
- `GET /api/briefings` - Listar briefings
- `POST /api/auth/login` - Autenticação

### Protegidos (requerem token)
- `POST /api/stories` - Criar story
- `PUT /api/stories/:id` - Editar story
- `DELETE /api/stories/:id` - Apagar story
- `POST /api/matches` - Criar match
- `PUT /api/matches/:id` - Editar match
- `DELETE /api/matches/:id` - Apagar match
- `POST /api/briefings` - Criar briefing
- `DELETE /api/briefings/:id` - Apagar briefing

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento (porta 8081)
PORT=8081 pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

---

## 🚀 Deploy para Produção

**⚠️ Importante:** O projeto usa **in-memory storage** temporário. Para produção, é necessário migrar para PostgreSQL.

### Opção 1: Railway (Recomendado - Mais Fácil)
1. Push do código para GitHub
2. Criar projeto no [Railway](https://railway.app)
3. Adicionar serviço PostgreSQL
4. Deploy automático ✅

### Opção 2: Vercel + Neon
1. Database no [Neon.tech](https://neon.tech)
2. Deploy no [Vercel](https://vercel.com)
3. Configurar env vars

### Variáveis de Ambiente Necessárias
```env
DATABASE_URL=postgresql://user:pass@host:5432/iberiahub
AUTH_PASSWORD=seu_password_seguro
AUTH_TOKEN=seu_jwt_token_seguro
PORT=8081
NODE_ENV=production
```

**📖 Ver `GUIA_DEPLOY.md` para instruções completas**

---

## 📚 Documentação

- **`DOCUMENTACAO_COMPLETA.md`** - Arquitetura completa, stack, fluxos
- **`CODIGOS_COMPLETOS.md`** - Todos os códigos principais
- **`GUIA_DEPLOY.md`** - Guia passo-a-passo para produção
- **`RELATORIO_TESTES.md`** - Testes e checklist de produção

---

## 🎯 Roadmap

### ✅ Completo
- [x] Frontend completo (9 páginas)
- [x] Backend API REST (13 endpoints)
- [x] Sistema de autenticação
- [x] CRUD stories/matches/briefings
- [x] Admin panel funcional
- [x] Design responsivo
- [x] Animações premium

### 🔄 Em Progresso
- [ ] Migração para PostgreSQL
- [ ] Sistema de uploads de imagens
- [ ] Multi-user com roles
- [ ] Email notifications

### 📝 Planeado
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] PWA support
- [ ] Dark/Light mode toggle

---

## 🤝 Contribuir

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Criar branch (`git checkout -b feature/AmazingFeature`)
3. Commit das mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados © 2026 IberiaHub.

---

## 👥 Equipa

**Hugo Melo** - Developer  
**IberiaHub** - Conceito & Design

---

## 🐛 Bugs Conhecidos

- Login form pode intermitentemente enviar payload vazio (workaround: login via API funciona)

---

## 📞 Suporte

Para questões e suporte, contactar através do GitHub Issues ou email.

---

## 🙏 Agradecimentos

- Shadcn UI pelos componentes base
- Lucide React pelos ícones
- Comunidade CS:GO/CS2 portuguesa

---

**Status:** ✅ 85% Pronto para Produção  
**Versão:** 5.0.0  
**Última Atualização:** Janeiro 2026

---

Feito com ❤️ para a comunidade CS Ibérica
