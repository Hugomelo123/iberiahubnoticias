# Contributing

Thanks for your interest in IberiaHub.  
This guide explains how to contribute effectively.

---

## Quick links

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Report a bug](.github/ISSUE_TEMPLATE/bug_report.md)
- [Request a feature](.github/ISSUE_TEMPLATE/feature_request.md)
- [Full documentation](DOCUMENTACAO_COMPLETA.md)

---

## How to contribute

### Report bugs
Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).  
Include: steps to reproduce, expected vs actual behavior, environment details.

### Suggest features
Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).  
Explain: the problem, your proposed solution, why it matters.

### Submit code
```bash
1. Fork the repo
2. Create feature branch: git checkout -b feat/my-feature
3. Make changes
4. Commit: git commit -m "feat: add my feature"
5. Push: git push origin feat/my-feature
6. Open PR
```

---

## Development setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/iberiahubnoticias.git
cd iberiahubnoticias

# Install
pnpm install

# Run
PORT=8081 pnpm dev
```

Open `http://localhost:8081/noticias`

---

## Code standards

### TypeScript
Always type everything explicitly.

```typescript
// ✅ Good
interface User {
  id: string;
  username: string;
}

const getUser = async (id: string): Promise<User | null> => { }

// ❌ Bad
const getUser = async (id) => { }  // implicit any
```

### React
Functional components with explicit props.

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad
export default function Button(props) {
  return <button>{props.label}</button>;
}
```

### Styling
Tailwind first. Custom CSS only when necessary.

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-xl">

// ❌ Bad
<div style={{ display: 'flex', padding: '24px' }}>
```

### File naming
```
Components:  PascalCase.tsx   (Button.tsx)
Utilities:   camelCase.ts     (formatDate.ts)
Pages:       kebab-case.tsx   (not-found.tsx)
Constants:   UPPER_SNAKE_CASE (API_BASE_URL)
Types:       PascalCase       (User, InsertStory)
```

---

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/).

### Format
```
<type>(<scope>): <subject>
```

### Types
```
feat      New feature
fix       Bug fix
docs      Documentation
style     Formatting (no logic change)
refactor  Code restructure (no behavior change)
perf      Performance improvement
test      Tests
chore     Maintenance
```

### Examples
```bash
feat(admin): add delete confirmation
fix(auth): prevent empty password
docs: update API reference
refactor(api): simplify client code
```

### Rules
- Use imperative mood: "add" not "added"
- Lowercase subject
- No period at end
- Max 72 characters
- Explain WHY, not HOW

---

## Pull request process

### Before submitting
- [ ] Code works locally
- [ ] No console.logs or commented code
- [ ] Follows style guide
- [ ] Documentation updated
- [ ] Descriptive commit message

### Template
Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md).  
Explain: what changed, why it changed, how to test it.

### Review
1. Submit PR
2. CI runs checks (when set up)
3. Maintainer reviews (within 48h)
4. Discussion and iteration
5. Approval and merge

---

## Project structure

```
client/src/
├── pages/           9 page components
├── components/
│   ├── editorial/   Domain-specific
│   └── ui/          Generic (Shadcn)
└── lib/             Utilities

server/
├── routes.ts        API endpoints
├── storage.ts       Data layer
└── index.ts         Express setup

shared/
└── schema.ts        Zod schemas + types
```

---

## Questions?

- Read [DOCUMENTACAO_COMPLETA.md](DOCUMENTACAO_COMPLETA.md)
- Open [Discussion](https://github.com/Hugomelo123/iberiahubnoticias/discussions)
- Report [Issue](https://github.com/Hugomelo123/iberiahubnoticias/issues)

---

## License

By contributing, you agree your contributions are licensed under [MIT](LICENSE).

---

**Thank you for contributing.**
