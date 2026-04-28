# Frontend - Lead Management System

A modern, high-performance frontend for the Lead Management System, built with React 19, TypeScript, Vite, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

## 🛠 Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting**: [ESLint](https://eslint.org/)

## 🧪 Testing & Quality Assurance

We use Vitest for unit and integration testing.

```bash
# Run all tests
pnpm run test

# Run linting
pnpm run lint

# Run type-checking
pnpm run type-check
```

## 📂 Architecture Overview

The project follows a standard React directory structure:

- `src/apis`: API integration points using Axios.
- `src/components/layout`: Layout-level components like the Sidebar.
- `src/components/ui`: Atomic UI components (Shadcn/UI base).
- `src/pages`: Feature-based page components.
- `src/tests`: Comprehensive unit and integration tests.
- `docs/`: Detailed technical documentation.

For more details, see [docs/architecture.md](./docs/architecture.md).

## 🤝 Contribution Guidelines

1. Ensure all tests pass before submitting a PR.
2. Follow the established DRY principles and coding standards.
3. Keep layout components in `src/components/layout` and core UI in `src/components/ui`.
