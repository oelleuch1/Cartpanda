# Cartpanda - Funnel Builder

A modern funnel builder application built with Clean Architecture principles.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Flow Diagram**: @xyflow/react
- **State Management**: Zustand
- **Notifications**: Sonner

## Project Structure

```
cartpanda/
├── domain/           # Business rules and entities
├── application/      # Use cases and state management
├── infrastructure/   # External adapters and repositories
└── ui/               # React presentation layer
```

## Prerequisites

- Node.js 18+
- npm

## Getting Started

### 1. Install Dependencies

```bash
cd ui
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Features

- Drag and drop funnel nodes
- Connect nodes with edges
- Move, delete, and duplicate nodes
- Undo/Redo functionality (Ctrl+Z)
- Save funnel (Ctrl+S)
- Download funnel as JSON
- Toast notifications for actions

## Keyboard Shortcuts

| Shortcut | Action           |
| -------- | ---------------- |
| `Ctrl+Z` | Undo last action |
| `Ctrl+S` | Save funnel      |

## Architecture

This project follows **Clean Architecture** with clear separation of concerns:

- **Domain Layer**: Pure business logic, entities, value objects
- **Application Layer**: Use cases that orchestrate domain logic
- **Infrastructure Layer**: External implementations (storage, APIs)
- **UI Layer**: React components and presentation logic

## License

Private
