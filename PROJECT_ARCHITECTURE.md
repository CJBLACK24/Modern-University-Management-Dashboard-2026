# Project Architecture & Codebase Protocol

> **Academic Infrastructure Suite (AIS)** > _Technical Reference & Directory Structure_

This document provides a comprehensive A-Z breakdown of the codebase structure, adhering to enterprise-level standardization protocols. It serves as the primary reference for understanding the "PERN" stack implementation within this Next.js + Refine ecosystem.

---

## 🏗️ Directory Hierarchy

### `/app`

_Core application logic and routing (Next.js App Router)._

- **`/api`**: Backend layer. Contains RESTful endpoints (`routes.ts`) for all resources (`/subjects`, `/classes`, etc.). Optimized for serverless execution.
- **`/[resource]`**: Route groups for frontend pages (e.g., `/subjects/page.tsx`, `/subjects/loading.tsx`). Adheres to Next.js nesting conventions.
- **`layout.tsx`**: Root layout definition, incorporating global providers (`RefineContext`, `ThemeProvider`).
- **`loading.tsx`**: Global suspense fallback using advanced Skeleton screens.

### `/components`

_Atomic and molecular UI building blocks._

- **`/ui`**: "Shadcn/UI" primitives (Button, Card, Input, etc.). Pure, stateless, and style-agnostic accessible components.
- **`/refine-ui`**: Specialized components tightly coupled with Refine logic.
  - **`/buttons`**: Action buttons with built-in logic (`ShowButton`, `CreateButton`, `EditButton`). _Updated with circular loading states._
  - **`/layout`**: Layout wrappers (`ThemedLayout`, `PageSkeleton`).
  - **`/views`**: Generic wrappers for CRUD views (`List`, `Show`, `Edit`).

### `/constants`

_Immutable configuration values._

- Contains global constants like API base URLs (`BACKEND_BASE_URL`), role definitions, and app-wide discrete values.

### `/db`

_Data persistence layer._

- **`index.ts`**: Database connection initialization (Drizzle Client).
- **`/schema`**: Logic-layer schema definitions.
  - **`app.ts`**: Application-specific tables (`classes`, `subjects`).
  - **`auth.ts`**: Authentication tables (`users`, `sessions`).

### `/hooks`

_Custom React Hooks._

- Encapsulates reusable logic (e.g., `useData`, `useNavigation`) to keep components clean.

### `/lib`

_Third-party integration libraries._

- **`utils.ts`**: Helper functions (e.g., `cn` for Tailwind class merging).
- **`cloudinary.ts`**: Configuration for image assets management.

### `/providers`

_Context providers for global state management._

- **`auth.ts`**: Authentication provider (NextAuth adapter).
- **`data.ts`**: Data provider (Refine <-> API bridge).
- **`live.ts`**: Real-time subscriptions (if active).

### `/public`

_Static assets._

- Global images, favicons, and fonts served directly to the client.

### `/types`

_TypeScript definitions._

- **`index.ts`**: Shared interfaces for entities (`Subject`, `User`, `Class`) ensuring type safety across the full stack.

### `/views`

_Page-level components._

- Decoupled from routing logic. Contains the actual UI implementation for each page (e.g., `subjects/list.tsx`, `subjects/show.tsx`).
- Promotes reusability and separation of concerns.

---

## ⚙️ Configuration Files

- **`.env.example`**: Template for environment variables. Security protocol dictates real secrets are strictly local.
- **`drizzle.config.ts`**: Configuration for Drizzle Kit (migrations and introspection).
- **`next.config.ts`**: Next.js build configuration (headers, image domains, rewrites).
- **`package.json`**: Dependency manifest and script definitions (`dev`, `build`, `start`).
- **`globals.css`**: Tailwind directives and global CSS variable definitions (Theme tokens).
- **`proxy.ts`**: Custom server/proxy configuration for complex routing scenarios.

---

## 🛡️ Coding Protocols & Standards

### 1. Skeleton Loading Strategy

All major navigations must utilize the `PageSkeleton` component.

- **Transition**: `fade-in duration-500`.
- **Accuracy**: Skeletons must mimic the final layout (List vs. Dashboard vs. Form) to prevent layout shift (CLS).
- **Interactive Feedback**: Action buttons (`View`, `Edit`) must transition to a `loading` state (spinner) immediately upon interaction to provide perceived performance.

### 2. Component Architecture

- **Atomic Design**: Small -> Big. (Button -> Form -> Card -> Page).
- **Composition**: Use `children` props over configuration objects where possible.
- **Headless Logic**: Use `hooks` for logic, `components` for visual representation.

### 3. State Management

- **Server State**: Managed via `Refine` (TanStack Query wrapper).
- **URL State**: Filters, Pagination, and Sorting must be reflected in the URL for shareability.

---

> **Status**: Production Ready
> **Stack**: PERN (Postgres, Express/Next, React, Node)
> **Compliance**: High
