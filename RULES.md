# RULES.md

## 🎯 VIBE CODER DEVELOPMENT PRINCIPLES

### 1. **Systemic Thinking End-to-End**

- Always consider the complete user journey from UI → API → Database → Backend → UI
- Think about edge cases, error states, and failure modes from day one
- Design for scalability, maintenance, and observability from inception

### 2. **Fundamental Engineering Excellence**

- Prioritize clean architecture over quick hacks
- Apply SOLID/DRY principles unless pragmatically justified
- Choose data structures and algorithms based on actual use cases
- Implement proper testing, security, and error handling as non-negotiable

### 3. **Entrepreneur Spirit & Value Creation**

- Build what matters, not just what's interesting
- Align every feature with real user problems and business outcomes
- Propose solutions, not just identify problems
- Balance perfectionism with pragmatic shipping ("Done > Perfect")

## 🎨 UI/UX CONSISTENCY RULES

### Color Palette (Strictly Follow)

- **Primary Background**: Use `bg-card` (or custom `#f8fafc` light / `#0f172a` dark)
- **Borders**: Use `border-border` (or custom `#e2e8f0` light / `#1e293b` dark)
- **Text**: Use `text-foreground` for primary, `text-muted-foreground` for secondary
- **Buttons**: Use primary variants for main actions, secondary for less important
- **Never** introduce new colors outside the established palette

### Component Consistency

- All headers must follow the same structure as "Classes" page (2nd-3rd image)
- All forms must follow the same validation and feedback patterns
- All loading states must use skeleton loaders (not loading spinners)
- All modals/dialogs must follow the same animation and styling

### Interaction Rules

- Buttons must have clear hover/focus/active states
- Forms must show validation errors inline
- Loading states must prevent double submissions
- All clickable elements must have proper cursor feedback
- **Join Class Button**: Must be functional and linked to the enrollment flow. If the button is unclickable, it must clearly indicate why (e.g., disabled state).
- **Skeleton Terminology**: Always use "skeleton loader" instead of "skeleton loading" for consistent naming (e.g., `DataTableSkeleton`).

## 📁 FOLDER STRUCTURE PROTOCOL

### Naming Conventions

- **Files**: `kebab-case.tsx` for components, `PascalCase.tsx` for pages
- **Folders**: `kebab-case` for all directories
- **Types**: `PascalCase` for interfaces/types, `SCREAMING_SNAKE_CASE` for constants

### Organization Rules

- One component per file (except barrel exports)
- Related components stay together in feature folders
- Shared utilities go in `/lib`
- Hooks go in `/hooks`
- Types go in `/types`
- Tests co-located with components

## 🔧 IMPLEMENTATION CHECKLIST (Pre-Coding)

Before writing any code, ensure:

- [ ] You understand the complete user flow
- [ ] You've considered edge cases and failure modes
- [ ] The solution follows engineering fundamentals
- [ ] It solves a real user problem
- [ ] It follows the established color palette
- [ ] It maintains component consistency
- [ ] You can ship it, learn, and iterate

---

**Vibe Coder Mantra:** "Think end-to-end, build fundamentally, create value—always."
