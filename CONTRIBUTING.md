# 🤝 Guia de Contribuição - IberiaHub Notícias

Obrigado pelo interesse em contribuir para o **IberiaHub Notícias**! 🎉

Este documento fornece guidelines para tornar o processo de contribuição fácil e eficaz para todos.

---

## 📋 Tabela de Conteúdos

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Setup de Desenvolvimento](#setup-de-desenvolvimento)
- [Guidelines de Código](#guidelines-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Convenções de Commit](#convenções-de-commit)

---

## 📜 Código de Conduta

Este projeto segue um código de conduta que esperamos que todos os participantes sigam. Por favor, lê o [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de contribuir.

---

## 🎯 Como Posso Contribuir?

### 🐛 Reportar Bugs

- Usa o [template de bug report](.github/ISSUE_TEMPLATE/bug_report.md)
- Verifica se o bug já foi reportado
- Inclui screenshots e logs se possível
- Descreve passos detalhados para reproduzir

### ✨ Sugerir Features

- Usa o [template de feature request](.github/ISSUE_TEMPLATE/feature_request.md)
- Explica claramente o problema que a feature resolve
- Inclui mockups se possível

### 💻 Contribuir com Código

1. Fork o repositório
2. Cria uma branch para a feature (`git checkout -b feature/AmazingFeature`)
3. Faz commit das mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abre um Pull Request

---

## 🛠️ Setup de Desenvolvimento

### Pré-requisitos

```bash
Node.js >= 20.x
pnpm >= 10.x
Git
```

### Instalação

```bash
# 1. Fork e clone o repositório
git clone https://github.com/SEU_USERNAME/iberiahubnoticias.git
cd iberiahubnoticias

# 2. Instalar dependências
pnpm install

# 3. Copiar variáveis de ambiente (criar .env se necessário)
# DATABASE_URL, AUTH_PASSWORD, etc.

# 4. Iniciar servidor de desenvolvimento
PORT=8081 pnpm dev

# 5. Abrir no browser
# http://localhost:8081/noticias
```

### Estrutura de Branches

- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas features
- `fix/*` - Bug fixes
- `docs/*` - Mudanças na documentação
- `refactor/*` - Refactoring de código

---

## 📝 Guidelines de Código

### TypeScript

```typescript
// ✅ BOM
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  // ...
}

// ❌ MAU
const getUser = async (id) => {
  // sem types
}
```

### React Components

```tsx
// ✅ BOM - Functional component com types
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ MAU - Sem types
export function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Styling

- Usar **Tailwind CSS** classes
- Seguir padrão de **mobile-first**
- Usar classes utilitárias antes de custom CSS

```tsx
// ✅ BOM
<div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl">

// ❌ MAU
<div style={{ display: 'flex', padding: '24px' }}>
```

### Naming Conventions

- **Ficheiros:** `kebab-case.tsx`
- **Componentes:** `PascalCase`
- **Funções:** `camelCase`
- **Constantes:** `UPPER_SNAKE_CASE`
- **Types/Interfaces:** `PascalCase`

```typescript
// Ficheiro: user-profile.tsx
interface UserProfile { }        // ✅
const API_BASE_URL = '...';      // ✅
const getUserProfile = () => {}; // ✅
export function UserProfile() {} // ✅
```

---

## 🔄 Processo de Pull Request

### Antes de Submeter

- [ ] Código segue o style guide
- [ ] Self-review realizado
- [ ] Comentários adicionados em código complexo
- [ ] Documentação atualizada
- [ ] Sem warnings
- [ ] Testes passam localmente

### Template de PR

Usa o [template de PR](.github/PULL_REQUEST_TEMPLATE.md) que inclui:

- Descrição das mudanças
- Tipo de mudança
- Issue relacionada
- Screenshots (se aplicável)
- Como testar

### Review Process

1. PR é submetido
2. CI/CD corre testes automáticos
3. Maintainer faz review
4. Mudanças solicitadas (se necessário)
5. Aprovação e merge

---

## 📌 Convenções de Commit

Usamos **Conventional Commits** para mensagens de commit claras e consistentes.

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` Nova feature
- `fix:` Bug fix
- `docs:` Mudanças na documentação
- `style:` Formatação (sem mudanças de código)
- `refactor:` Refactoring
- `perf:` Performance improvements
- `test:` Adicionar/corrigir testes
- `chore:` Tarefas de manutenção

### Exemplos

```bash
# Feature
feat(admin): adicionar botão de criar story

# Bug fix
fix(auth): corrigir login form payload vazio

# Documentação
docs(readme): atualizar instruções de instalação

# Refactor
refactor(api): simplificar lógica de fetch

# Performance
perf(homepage): otimizar carregamento de imagens
```

### Scope (opcional)

- `frontend` - Mudanças no client
- `backend` - Mudanças no server
- `api` - Mudanças nos endpoints
- `auth` - Autenticação
- `admin` - Painel admin
- `docs` - Documentação

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Escrever Testes

```typescript
// Exemplo de teste para componente
describe('Button', () => {
  it('should render with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 📚 Documentação

### Atualizar Documentação

Ao fazer mudanças que afetam:
- API endpoints → atualizar `DOCUMENTACAO_COMPLETA.md`
- Configuração → atualizar `README.md`
- Deploy → atualizar `GUIA_DEPLOY.md`

### JSDoc Comments

```typescript
/**
 * Faz fetch de uma story por slug
 * @param slug - URL-friendly story identifier
 * @returns Promise com story object ou undefined
 */
async function getStory(slug: string): Promise<Story | undefined> {
  // ...
}
```

---

## ❓ Dúvidas?

- 📖 Lê a [documentação completa](DOCUMENTACAO_COMPLETA.md)
- 💬 Abre uma [Discussion](https://github.com/Hugomelo123/iberiahubnoticias/discussions)
- 🐛 Reporta um [Issue](https://github.com/Hugomelo123/iberiahubnoticias/issues)

---

## 🙏 Agradecimentos

Obrigado por contribuir para o IberiaHub Notícias! Cada contribuição, por mais pequena que seja, faz a diferença. ❤️

---

**Happy Coding!** 🚀
