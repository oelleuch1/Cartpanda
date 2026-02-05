# Modern Dashboard Architecture for Cartpanda

## Context

This document describes how I would build a modern admin dashboard for Cartpanda's funnels + checkout product, covering: funnels, orders, customers, subscriptions, analytics, disputes, settings, and permissions. The approach is grounded in the **Clean Architecture** patterns already established in this codebase—with clear separation between domain, application, infrastructure, and UI layers.

---

## 1. Architecture

### The Foundation: Clean Architecture

Looking at this project, I'd extend the existing layered structure that's already working well:

```
cartpanda/
├── domain/                    # Business rules (zero dependencies)
│   ├── entities/              # Funnel, Order, Customer, Subscription
│   ├── value-objects/         # OrderId, CustomerId, Money, Email
│   ├── services/              # Domain logic (validators, factories)
│   └── shared/                # DomainResult<T>, error types
│
├── application/               # Use cases (orchestrates domain)
│   ├── use-cases/             # AddOrder, RefundOrder, CreateDispute
│   ├── repositories/          # Interfaces (IOrderRepository, etc.)
│   └── state/                 # Application state management
│
├── infrastructure/            # External world (implements interfaces)
│   ├── adapters/              # LocalStorage, API clients
│   ├── mappers/               # DTO ↔ Domain transformations
│   └── dtos/                  # Data transfer objects
│
└── ui/                        # React presentation layer
    └── src/
        ├── app/               # App shell, routing, providers
        ├── features/          # Domain-aligned feature modules
        │   ├── funnels/       # (existing)
        │   ├── orders/        # pages, components, hooks, api
        │   ├── customers/
        │   ├── subscriptions/
        │   ├── analytics/
        │   ├── disputes/
        │   ├── settings/
        │   └── permissions/
        ├── components/        # Shared UI components
        ├── hooks/             # Shared hooks
        ├── utils/             # Utilities (tailwind, toast, keyboard)
        ├── types/             # Centralized type definitions
        └── plugins/           # Dependency injection
```

### Feature Module Structure

Each feature owns everything it needs, following the pattern established with funnels:

```
features/orders/
├── pages/
│   ├── OrdersListPage.tsx
│   └── OrderDetailPage.tsx
├── components/
│   ├── OrdersTable.tsx
│   ├── OrderStatusBadge.tsx
│   └── OrderFilters.tsx
├── hooks/
│   ├── useOrders.ts           # Query hook
│   ├── useOrderMutations.ts   # Mutations
│   └── handlers/              # Event handlers (like funnels)
│       ├── domainOperations.ts
│       ├── typeGuards.ts
│       └── index.ts
└── index.ts                   # Public exports only
```

### Why This Works

The current project already demonstrates this well:

- **Domain layer** has pure business logic (`Funnel`, `FunnelNode`, `NodePosition`)
- **Application layer** has use cases (`AddNodeUseCase`, `MoveNodeUseCase`) that return `DomainResult<T>`
- **UI layer** uses these through dependency injection (`getAppDependencies()`)

This means adding "orders" is just creating a new slice, not rewriting anything. Six months from now, the orders team can ship independently from the funnels team.

### The Golden Rule

Features import from `shared/` layers. Features **never** import from other features. When two features need something, it moves to `domain/` or `shared/`. This is already enforced in the current codebase structure.

---

## 2. Design System

### Build vs Buy: A Pragmatic Mix

Looking at the current stack (Tailwind CSS, lucide-react, clsx, tailwind-merge), I'd continue with:

- **Radix UI** for accessible primitives (Dialog, Dropdown, Tabs, Tooltip)
- **Tailwind CSS** for styling (already in use, fast iteration)
- **Custom components** wrapping Radix with our tokens (like the existing Button patterns)

The project already has good patterns with `cn()` utility from `tailwind-merge` + `clsx`:

```typescript
// utils/tailwind.ts - already exists
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Design Tokens (Already Established)

The project uses CSS variables with Tailwind, which is the right approach:

```css
/* Already in use */
--background, --foreground, --card, --border, --primary, --muted
```

I'd extend this with a proper token system:

```typescript
// design-system/tokens.ts
export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
} as const;

// Already exists: utils/iconSizes.ts
export const ICON_SIZE = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
} as const;
```

### Accessibility (WCAG AA Compliance)

This isn't negotiable—it's a requirement:

- **Radix primitives** handle keyboard navigation, focus management, ARIA
- **Color contrast** 4.5:1 minimum (enforced in token definitions)
- **Focus indicators** visible and consistent (the project uses `focus:ring-2`)
- **Keyboard shortcuts** already implemented (`utils/keyboard.ts`)
- **Toast notifications** provide screen reader feedback (`utils/toast.ts` with sonner)

```typescript
// Already in the codebase - keyboard.ts
export const KeyboardShortcuts = {
  isUndo: (e: KeyboardEvent) => (e.ctrlKey || e.metaKey) && e.key === "z",
  isSave: (e: KeyboardEvent) => (e.ctrlKey || e.metaKey) && e.key === "s",
};
```

---

## 3. Data Fetching + State

### The Split: Server State vs Client State

The current project already does this correctly:

**Application State** (`FunnelState`): Manages domain state with snapshots and undo:

```typescript
// application/state/FunnelState.ts
export class FunnelState {
  private current: Funnel;
  private snapshots: Funnel[] = [];

  saveSnapshot(): void { ... }
  undo(): void { ... }
}
```

**UI State** (React hooks + Zustand): Transient UI state like selected items, modal visibility.

For the dashboard, I'd add **TanStack Query** for server communication:

```typescript
// features/orders/hooks/useOrders.ts
export const orderKeys = {
  all: ["orders"] as const,
  list: (filters: OrderFilters) => [...orderKeys.all, "list", filters] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};

export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => orderRepository.findAll(filters),
    staleTime: 30_000,
  });
}
```

### Loading / Error / Empty States

Following the toast pattern already in place (`utils/toast.ts`):

```typescript
// Every data component follows this pattern
function OrdersPage() {
  const { data, isLoading, error, refetch } = useOrders(filters);

  if (isLoading) return <OrdersTableSkeleton />;
  if (error) {
    Toasts.error(error.code); // Already have this pattern!
    return <ErrorState retry={refetch} />;
  }
  if (data.length === 0) return <EmptyState message="No orders yet" />;

  return <OrdersTable data={data} />;
}
```

The project already has humanized error messages:

```typescript
// utils/toast.ts - existing pattern
const ERROR_MESSAGES: Record<FunnelErrorCode, string> = {
  [FunnelErrorCode.NODE_NOT_FOUND]: "The node you're looking for doesn't exist",
  [FunnelErrorCode.EDGE_ALREADY_EXISTS]: "These nodes are already connected",
  // ...
};
```

### Tables: Filters, Sorting, Pagination

URL-driven state for shareability:

```typescript
// /orders?status=pending&sort=createdAt:desc&page=2

function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    filters: parseFilters(searchParams),
    sort: parseSort(searchParams),
    page: Number(searchParams.get("page") ?? "1"),
    update: (params) => setSearchParams(serialize(params)),
  };
}
```

---

## 4. Performance

### Bundle Splitting

Each feature is lazy-loaded, following the existing app structure:

```typescript
// app/routes.tsx
const FunnelsPage = lazy(() => import('@/features/funnels/pages/FunnelsPage'));
const OrdersPage = lazy(() => import('@/features/orders/pages/OrdersPage'));
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'));

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/funnels/*" element={<FunnelsPage />} />
    <Route path="/orders/*" element={<OrdersPage />} />
  </Routes>
</Suspense>
```

### Virtualization

For large tables (orders, customers), use TanStack Virtual:

```typescript
const rowVirtualizer = useVirtualizer({
  count: orders.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 52,
  overscan: 5,
});
```

### Memoization Strategy

The project already shows good patterns with `useCallback`:

```typescript
// Already in FunnelCanvasActions.tsx
const handleSave = useCallback(() => {
  saveFunnel.execute(funnelState.funnel);
  Toasts.saved();
}, [saveFunnel, funnelState.funnel]);
```

### Measuring "Slow"

```typescript
// Web Vitals for real user metrics
import { onLCP, onFID, onCLS } from "web-vitals";

onLCP((metric) => analytics.track("LCP", { value: metric.value }));
onFID((metric) => analytics.track("FID", { value: metric.value }));
onCLS((metric) => analytics.track("CLS", { value: metric.value }));
```

Custom timing for critical paths:

- Orders list load: target < 1.5s
- Analytics charts render: target < 2s
- Search results: target < 500ms

---

## 5. Developer Experience & Team Scaling

### Onboarding (First Day Productive)

A new engineer should ship their first PR on day one:

1. **README.md**: `pnpm install && pnpm dev` gets you running
2. **ARCHITECTURE.md**: Explains the Clean Architecture layers
3. **CONTRIBUTING.md**: PR guidelines, conventions, testing requirements
4. **Storybook**: All shared components documented with examples

### Enforced Conventions

The project has ESLint configured. I'd add rules to enforce architecture:

```javascript
// eslint.config.js
"import/no-restricted-paths": [{
  "zones": [{
    "target": "./ui/src/features/orders",
    "from": "./ui/src/features/funnels",
    "message": "Features cannot import from other features"
  }]
}]
```

**Husky + lint-staged** for pre-commit:

```bash
pnpm lint-staged
pnpm tsc --noEmit
```

### PR Template

```markdown
## What does this PR do?

## How to test

## Screenshots (if UI change)

## Checklist

- [ ] Types compile (`pnpm tsc --noEmit`)
- [ ] Loading/error states handled
- [ ] Keyboard navigation works
- [ ] Toast feedback added where appropriate
```

### Preventing One-Off UI

- Components come from `shared/components/` or `design-system/`
- Custom styles only in feature-specific components
- Code review catches violations
- Storybook makes the "right way" obvious

---

## 6. Testing Strategy

### The Testing Trophy

**Unit tests** (Vitest) — Domain and utility logic:

- Value objects: `NodeId.create()`, `Money.add()`
- Domain services: `FunnelValidator`, price calculations
- Utilities: `cn()`, `KeyboardShortcuts`, toast helpers

**Integration tests** (Testing Library) — Features work correctly:

- "User can filter orders by status"
- "User can drag a node and see position update"
- Mocked repositories, real component tree

**E2E tests** (Playwright) — Critical user journeys:

- Login → View orders → Filter → Export
- Create funnel → Add nodes → Save → Reload (persisted)
- Handle error states gracefully

### Minimum Testing Bar

Before any PR merges:

1. **New domain logic?** Unit test the `DomainResult` success/error cases
2. **New use case?** Test that it calls the right repository methods
3. **New UI feature?** Integration test the happy path
4. **Bug fix?** Write a test that reproduces it first

---

## 7. Release & Quality

### Feature Flags

Every significant feature ships behind a flag:

```typescript
function OrdersPage() {
  const showBulkActions = useFeatureFlag('orders-bulk-actions');

  return (
    <OrdersTable>
      {showBulkActions && <BulkActionsToolbar />}
    </OrdersTable>
  );
}
```

### Staged Rollouts

1. **Internal team** (dogfooding): 1-2 days
2. **5% of users**: 2 days, monitoring error rates
3. **50%**: 2 more days
4. **100%**: Remove flag in next sprint

### Error Monitoring (Sentry)

The project already has toast-based error handling. I'd extend with Sentry:

```typescript
// On DomainResult.error
if (result.error) {
  Sentry.captureException(result.error, {
    tags: { feature: "funnels", action: "addNode" },
  });
  Toasts.error(result.error.code);
}
```

### Ship Fast But Safe

The philosophy: **Small PRs, behind flags, with monitoring.**

- PRs under 400 lines (reviewable, revertible)
- Deploy to production daily
- Feature flags kill broken features without rollback
- Error alerts within 5 minutes

---

## Pragmatic Tradeoffs

### What I'd Skip Now

- **Micro-frontends**: Overkill until we have 10+ teams. Clean Architecture modules give 80% of the benefit.
- **GraphQL**: REST is simpler for CRUD. Reconsider when we have complex data requirements.
- **100% test coverage**: 60-70% on the right things beats 100% on everything.
- **Perfect typing**: `as const` and inference cover 90% of cases.

### What I'd Invest In Early

- **Design tokens + component library**: Every week delayed = more one-off components to fix
- **DomainResult pattern** (already done!): Consistent error handling from day one
- **Barrel files and clean exports**: The project already does this well
- **Accessibility from day one**: Retrofitting is 10x harder

---

## Summary

The beauty of this codebase is that the hard architectural decisions are already made:

- **Clean Architecture** separates concerns clearly
- **DomainResult<T>** provides consistent error handling
- **Dependency injection** through `getAppDependencies()` enables testing
- **Centralized types** in `types/index.ts` prevent drift
- **Toast notifications** give users immediate feedback

Extending this to a full dashboard means applying the same patterns to new domains. The `funnels` feature is the template—orders, customers, subscriptions follow the same structure.

The goal isn't perfection—it's an architecture that doesn't fight you as you grow. This one already works. Now we scale it.
