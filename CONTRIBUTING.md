# 🤝 Contributing to IberiaHub Notícias

First off, **thank you** for considering contributing to IberiaHub! 🎉

Whether you're fixing a typo, reporting a bug, or building an entire feature, every contribution matters. This guide will help you get started and make the process smooth for everyone involved.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Just Have a Question](#i-just-have-a-question)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all participants are expected to uphold. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

**TL;DR:** Be kind, be respectful, and remember there's a human on the other side of every GitHub username.

---

## 💬 I Just Have a Question

> **Please don't file an issue to ask a question.**

We have a few channels for questions:
- **GitHub Discussions** - Best for longer conversations
- **Discord** - Real-time chat with the community
- **Documentation** - Check [DOCUMENTACAO_COMPLETA.md](DOCUMENTACAO_COMPLETA.md) first

---

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us squash it!

**Before submitting:**
- Check existing [issues](https://github.com/Hugomelo123/iberiahubnoticias/issues)
- Try the latest version - it might already be fixed
- Collect information: OS, Node version, browser, steps to reproduce

**When submitting:**
- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include screenshots or GIFs if relevant
- Describe expected vs actual behavior
- Share error messages and console logs

### ✨ Suggesting Features

Have an idea? We'd love to hear it!

**Before suggesting:**
- Check the [roadmap](#-roadmap) - it might already be planned
- Search existing [discussions](https://github.com/Hugomelo123/iberiahubnoticias/discussions)
- Think about: Does this fit the project's vision?

**When suggesting:**
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem it solves
- Describe your proposed solution
- Add mockups or examples if possible

### 💻 Contributing Code

Ready to dive in? Here's the flow:

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** everything works
6. **Commit** with a clear message
7. **Push** to your fork
8. **Open** a Pull Request

```bash
# Example flow
git clone https://github.com/YOUR_USERNAME/iberiahubnoticias.git
cd iberiahubnoticias
git checkout -b feat/my-amazing-feature

# ... make changes ...

git add .
git commit -m "feat: add my amazing feature"
git push origin feat/my-amazing-feature

# Now open a PR on GitHub!
```

---

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js >= 20.x
pnpm >= 10.x
Git
```

### Getting Started

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/iberiahubnoticias.git
cd iberiahubnoticias

# 2. Install dependencies (this might take a minute)
pnpm install

# 3. Start development server
PORT=8081 pnpm dev

# 4. Open browser
# → http://localhost:8081/noticias

# 5. Make changes and see them live! ✨
```

### Project Structure Quick Tour

```
client/src/          # Frontend code
  pages/             # Page components (9 total)
  components/        # Reusable components
    editorial/       # Domain-specific components
    ui/              # Generic UI components (Shadcn)
  lib/               # Utilities and API client

server/              # Backend code
  routes.ts          # API endpoint definitions
  storage.ts         # Data layer (in-memory for now)
  index.ts           # Express app setup

shared/              # Code used by both frontend and backend
  schema.ts          # Zod schemas and TypeScript types
```

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch (not used yet)
- `feature/*` - New features (`feature/match-filters`)
- `fix/*` - Bug fixes (`fix/login-payload`)
- `docs/*` - Documentation (`docs/api-reference`)
- `refactor/*` - Code improvements (`refactor/api-client`)

---

## 📝 Coding Standards

### TypeScript: Always Type Everything

```typescript
// ✅ YES - Explicit types
interface User {
  id: string;
  username: string;
  createdAt: Date;
}

const fetchUser = async (id: string): Promise<User | null> => {
  // ...
};

// ❌ NO - Implicit any
const fetchUser = async (id) => {
  // TypeScript: "id is any" 😢
};
```

### React: Functional Components with Explicit Props

```tsx
// ✅ YES - Clear interface, named export
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

export function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ❌ NO - No types, default export
export default function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Styling: Tailwind First, Custom CSS Last Resort

```tsx
// ✅ YES - Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">

// ⚠️ OK - When you absolutely need it
<div className="custom-gradient-effect">
// + custom CSS in index.css

// ❌ NO - Inline styles
<div style={{ display: 'flex', padding: '24px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
```

### File Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | `PascalCase.tsx` | `MatchCard.tsx` |
| Utilities | `camelCase.ts` | `formatDate.ts` |
| Pages | `kebab-case.tsx` | `not-found.tsx` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Interfaces/Types | `PascalCase` | `MatchLive`, `InsertStory` |

### Code Organization

```typescript
// File: components/MatchCard.tsx

// 1. Imports (external first, then internal)
import { motion } from 'framer-motion';
import { Tv, Mic2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type { Match } from '@shared/schema';

// 2. Types/Interfaces
interface MatchCardProps {
  match: Match;
  isLive?: boolean;
}

// 3. Constants
const ANIMATION_DURATION = 0.3;

// 4. Component
export function MatchCard({ match, isLive = false }: MatchCardProps) {
  // ...
}

// 5. Helper functions (if needed)
function formatMatchTime(time: string): string {
  // ...
}
```

---

## 🔄 Pull Request Process

### Before You Submit

- [ ] **Code works** - Test it locally
- [ ] **Code is clean** - No console.logs, commented code, or TODOs
- [ ] **Follows style guide** - Check the conventions above
- [ ] **Documentation updated** - If you changed APIs or added features
- [ ] **No linter errors** - Run `pnpm lint` (when we add it!)
- [ ] **Descriptive commit messages** - See guidelines below

### PR Template Checklist

When you open a PR, you'll see a template. Fill it out! It helps reviewers understand:
- What changed
- Why it changed
- How to test it
- What the impact is

### Review Process

1. **You submit** the PR
2. **CI runs** automated checks (when we set it up)
3. **Maintainer reviews** - usually within 48 hours
4. **Discussion happens** - questions, suggestions, requests for changes
5. **You iterate** - push fixes to the same branch
6. **Approval** - maintainer approves
7. **Merge** - maintainer merges to main

### After Merge

🎉 **Congratulations!** You're now a contributor!

Your name will be added to our contributors list (coming soon), and you'll forever be part of IberiaHub's history.

---

## 📌 Commit Message Guidelines

We use **Conventional Commits** for clarity and automated changelog generation.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (Required)

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add match filtering` |
| `fix` | Bug fix | `fix: resolve login form error` |
| `docs` | Documentation only | `docs: update API reference` |
| `style` | Code formatting (no logic change) | `style: format with prettier` |
| `refactor` | Code restructure (no behavior change) | `refactor: simplify API client` |
| `perf` | Performance improvement | `perf: optimize image loading` |
| `test` | Adding or fixing tests | `test: add match widget tests` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

### Scope (Optional but Encouraged)

Indicates which part of the codebase changed:
- `frontend`, `backend`, `api`, `auth`, `admin`, `docs`, `ui`, `storage`

### Examples

```bash
# Simple feature
feat(admin): add delete confirmation dialog

# Bug fix with context
fix(auth): prevent empty password submission

The login form was sending empty POST requests when Enter
was pressed before typing. Added input validation.

Fixes #42

# Breaking change
feat(api)!: change story endpoint response format

BREAKING CHANGE: /api/stories now returns `{ data: [], meta: {} }`
instead of a plain array. Update client code accordingly.

# Documentation
docs: add API endpoint examples

Added code examples for all 13 endpoints in DOCUMENTACAO_COMPLETA.md

# Multiple changes
feat(matches): add live indicator and caster info
- Add pulsing LIVE badge
- Display caster name and Twitch link
- Improve mobile layout
```

### Rules

1. **Use imperative mood** - "add" not "added" or "adds"
2. **Lowercase subject** - `feat: add feature` not `feat: Add feature`
3. **No period at end** - `feat: add feature` not `feat: add feature.`
4. **Keep subject under 72 characters**
5. **Separate subject from body** with a blank line
6. **Explain WHAT and WHY**, not HOW (code shows how)

---

## 🧪 Testing

### Running Tests

```bash
# All tests (coming soon!)
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Writing Tests

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📚 Documentation

### When to Update Docs

Update documentation if you:
- Add or modify API endpoints → `DOCUMENTACAO_COMPLETA.md`
- Change configuration → `README.md`
- Modify deployment process → `GUIA_DEPLOY.md`
- Add new features → `README.md` + relevant docs

### JSDoc Comments

Add JSDoc for public functions:

```typescript
/**
 * Fetches a story by its URL-friendly slug
 * 
 * @param slug - The story's unique identifier (e.g., "saw-wins-major")
 * @returns Promise resolving to story object or undefined if not found
 * @throws {Error} If network request fails
 * 
 * @example
 * const story = await getStory('saw-wins-major');
 * if (story) {
 *   console.log(story.title);
 * }
 */
export async function getStory(slug: string): Promise<Story | undefined> {
  // ...
}
```

---

## 🎨 UI/UX Guidelines

### Design Principles

1. **Content First** - Design serves the content, not the other way around
2. **Minimal Friction** - Every click should have purpose
3. **Performance Matters** - Smooth animations, fast loads
4. **Accessibility** - Keyboard navigation, screen reader support
5. **Mobile Friendly** - Touch targets, responsive layouts

### Animation Guidelines

- **Duration:** 150-300ms for most interactions
- **Easing:** Use `ease-out` for entrances, `ease-in` for exits
- **Purpose:** Animations should provide feedback or guide attention
- **Subtlety:** Less is more - don't overdo it

```tsx
// ✅ YES - Subtle, purposeful
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>

// ❌ NO - Excessive, distracting
<motion.div
  whileHover={{ scale: 1.5, rotate: 360 }}
  transition={{ duration: 2 }}
>
```

---

## ❓ Questions?

Still unsure about something? We're here to help!

- 📖 **Read the docs:** [DOCUMENTACAO_COMPLETA.md](DOCUMENTACAO_COMPLETA.md)
- 💬 **Ask in Discussions:** [GitHub Discussions](https://github.com/Hugomelo123/iberiahubnoticias/discussions)
- 🐛 **Report an issue:** [GitHub Issues](https://github.com/Hugomelo123/iberiahubnoticias/issues)

---

## 🌟 Recognition

Contributors are the lifeblood of open source. We value every contribution, no matter how small.

**Coming soon:** Contributors page showcasing everyone who's helped make IberiaHub better.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers this project.

---

<div align="center">

**Thank you for contributing! 🙏**

*Every line of code, every bug report, every suggestion makes IberiaHub better.*

**Happy coding! 🚀**

</div>
