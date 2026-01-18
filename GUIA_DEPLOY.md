# 🚀 GUIA DE DEPLOY - IBERIAHUB NOTÍCIAS V5

## ✅ STATUS ATUAL
**Backend:** ✅ Completo e funcional (API REST)  
**Frontend:** ✅ Completo e funcional (9 páginas)  
**Integração:** ✅ Frontend↔Backend funcionando  
**Pronto para produção:** ⚠️ 85% (falta DB real)

---

## 🎯 OPÇÕES DE DEPLOY RECOMENDADAS

### OPÇÃO 1: Vercel + Neon (RECOMENDADO - Mais Rápido)
**Custo:** Free tier inicial  
**Dificuldade:** ⭐⭐ (Fácil)  
**Tempo setup:** ~30 minutos

**Stack:**
- Frontend + Backend: Vercel (Serverless)
- Base de dados: Neon PostgreSQL (serverless)
- Files: Vercel Blob Storage (para uploads futuros)

**Passos:**
1. Criar conta Neon.tech
2. Criar database PostgreSQL
3. Copiar `DATABASE_URL`
4. Push código para GitHub
5. Importar para Vercel
6. Adicionar env vars:
   - `DATABASE_URL`
   - `AUTH_PASSWORD=seu_password_seguro`
   - `AUTH_TOKEN=seu_token_jwt_seguro`
7. Deploy automático ✅

---

### OPÇÃO 2: Railway (RECOMENDADO - Mais Simples)
**Custo:** $5/mês depois trial  
**Dificuldade:** ⭐ (Muito fácil)  
**Tempo setup:** ~15 minutos

**Stack:**
- Frontend + Backend + DB: Tudo no Railway
- PostgreSQL incluído
- SSL automático

**Passos:**
1. Push código para GitHub
2. railway.app → New Project → Deploy from GitHub
3. Adicionar PostgreSQL service
4. Railway auto-detecta env vars
5. Deploy automático ✅

---

### OPÇÃO 3: VPS Tradicional (Controlo Total)
**Custo:** ~€5-10/mês (Hetzner/OVH)  
**Dificuldade:** ⭐⭐⭐⭐ (Avançado)  
**Tempo setup:** ~2-3 horas

**Stack:**
- Server: Ubuntu 24.04
- Webserver: Nginx
- Database: PostgreSQL
- PM2 para Node.js
- Certbot para SSL

---

## 🔧 ALTERAÇÕES NECESSÁRIAS PRÉ-DEPLOY

### 1. Adicionar Variáveis Ambiente

Criar `.env` na raiz:
```bash
# Base de dados
DATABASE_URL=postgresql://user:pass@host:5432/iberiahub

# Autenticação (MUDAR ESTES VALORES!)
AUTH_PASSWORD=seu_password_muito_seguro_aqui
AUTH_TOKEN=seu_jwt_token_super_seguro_aleatorio

# Server
PORT=8081
NODE_ENV=production
```

### 2. Atualizar `server/storage.ts`

Substituir `MemStorage` por `PostgresStorage`:

```typescript
// Adicionar no topo
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Implementar PostgresStorage class
export class PostgresStorage implements IStorage {
  // ... métodos usando pool.query()
}

export const storage = new PostgresStorage();
```

### 3. Adicionar Dependência PostgreSQL

```bash
pnpm add pg
pnpm add -D @types/pg
```

### 4. Criar Migration SQL

Criar `migrations/001_initial.sql`:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  what_happened TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  entity VARCHAR(255) NOT NULL,
  time VARCHAR(50),
  timestamp TIMESTAMP NOT NULL,
  type VARCHAR(50) NOT NULL,
  image TEXT,
  published BOOLEAN DEFAULT true,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(255) NOT NULL,
  content_block1 TEXT,
  content_block2 TEXT,
  content_hub_link_text VARCHAR(255),
  content_hub_link_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a VARCHAR(255) NOT NULL,
  team_b VARCHAR(255) NOT NULL,
  competition VARCHAR(255) NOT NULL,
  time VARCHAR(50) NOT NULL,
  is_live BOOLEAN DEFAULT false,
  caster VARCHAR(255),
  link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE briefings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  time VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed inicial
INSERT INTO users (username, password) VALUES ('editor', 'MUDAR_ISTO');
```

### 5. Atualizar package.json

Adicionar scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsx script/build.ts",
    "start": "NODE_ENV=production node dist/index.cjs",
    "migrate": "psql $DATABASE_URL -f migrations/001_initial.sql"
  }
}
```

---

## 🔒 SEGURANÇA PRÉ-DEPLOY

### ✅ Checklist Segurança:
- [ ] Mudar `AUTH_PASSWORD` para valor seguro
- [ ] Mudar `AUTH_TOKEN` para JWT real (256-bit)
- [ ] Adicionar rate limiting (express-rate-limit)
- [ ] Configurar CORS apropriado
- [ ] HTTPS obrigatório em produção
- [ ] Sanitizar inputs (validator.js)
- [ ] Hash passwords com bcrypt
- [ ] Adicionar helmet.js

### Instalar deps segurança:
```bash
pnpm add express-rate-limit helmet cors bcryptjs
pnpm add -D @types/bcryptjs
```

---

## 📊 MONITORIZAÇÃO (Opcional mas Recomendado)

### Opções Gratuitas:
1. **Sentry** - Error tracking
2. **LogRocket** - Session replay
3. **Google Analytics** - Visitantes
4. **UptimeRobot** - Uptime monitoring

---

## 🎯 PLANO DE DEPLOY RECOMENDADO (Railway)

### Passo a Passo:
```bash
# 1. Preparar código
git add .
git commit -m "Preparar para produção"
git push origin main

# 2. Deploy Railway (via UI)
# - Ir a railway.app
# - New Project → Deploy from GitHub
# - Selecionar repositório
# - Adicionar PostgreSQL
# - Aguardar deploy

# 3. Configurar env vars no Railway dashboard
AUTH_PASSWORD=seu_password_seguro
AUTH_TOKEN=seu_token_seguro

# 4. Executar migrations
# Via Railway CLI ou UI SQL editor
# Correr migrations/001_initial.sql

# 5. Testar!
# Visitar URL do Railway
# Fazer login, criar story, verificar funciona

# 6. Domínio custom (opcional)
# Settings → Add custom domain
# Configurar DNS
```

---

## ⚡ REQUISITOS MÍNIMOS SERVIDOR

**CPU:** 1 vCPU  
**RAM:** 512 MB (1GB recomendado)  
**Disco:** 10 GB  
**Largura de banda:** 1 TB/mês

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot connect to database"
- Verificar DATABASE_URL correto
- Confirmar DB está running
- Verificar firewall/security groups

### Erro: "Module not found"
- Correr `pnpm install` no servidor
- Verificar package.json tem todas deps

### Erro: "Port already in use"
- Matar processo: `lsof -ti:8081 | xargs kill -9`
- Ou mudar PORT em `.env`

---

## ✅ CHECKLIST FINAL PRÉ-LIVE

- [ ] Código no GitHub
- [ ] Database criada e migrada
- [ ] Env vars configuradas
- [ ] Build produção testado localmente
- [ ] SSL/HTTPS ativado
- [ ] Domínio configurado (opcional)
- [ ] Backup automático DB ativado
- [ ] Monitoring configurado
- [ ] Testar criar/editar/apagar content
- [ ] Testar em mobile
- [ ] Avisar equipa está LIVE! 🎉

---

**Estimativa tempo total:** 1-3 horas (Railway) ou 1 dia (VPS)  
**Recomendação:** Começar com Railway, migrar para VPS depois se necessário.
