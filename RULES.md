# RULES.md — VERIFIED DEVELOPMENT PROTOCOL

_Status: Production-Ready_  
_Last Verified: 2026-01-12_

---

## 🎯 CORE MINDSET — **VIBE CODER**

1. **Systemic Thinking**  
   Always understand the full flow: **User → UI → API → Database**.

2. **Fundamental Excellence**  
   Prioritize:

   - OKLCH-based color systems
   - Semantic HTML
   - Zod-driven validation

3. **Entrepreneur Spirit**  
   Build solutions that:
   - Solve real problems
   - Use memorable, founder-led design decisions
   - Ship clean, usable features

---

## 🏗️ VERIFIED CORE ARCHITECTURE

### 1. Layout & Container Patterns

**Mandatory Page Wrapper (Never Bypass):**

```tsx
<Authenticated>
  <Layout>{children}</Layout>
</Authenticated>
```

**Verified Main Container Classes:**

- Mobile: `px-2 pt-4`
- Tablet: `md:p-4`
- Desktop: `lg:px-6 lg:pt-6`

**Canonical Implementation:**
`components/refine-ui/layout/layout.tsx`

---

### 2. Component Hierarchy (Verified)

```text
<RefineContext>
└── <RootLayout>
    └── <Authenticated>
        └── <Layout>
            ├── <Sidebar>
            ├── <Header>
            ├── <Breadcrumb>
            └── <Main>
                └── {page content}
```

**Rule:** Every page must follow this hierarchy exactly.

---

## 🎨 DESIGN SYSTEM — Tailwind v4 + OKLCH

### Color Tokens (globals.css)

**Light Mode**

```css
--primary: oklch(0.8348 0.1302 160.908);
--background: oklch(0.9911 0 0);
```

**Dark Mode**

```css
--primary: oklch(0.4365 0.1044 156.7556);
--background: oklch(0.1822 0 0);
```

### Usage Rules

- **Text:** `text-foreground`
- **Backgrounds:** `bg-background`, `bg-card`
- **Borders:** `border-border`
- **Never hardcode colors**

### Gradients

```css
.text-gradient-orange {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Use **only** for major titles and key headers.

---

## 🔘 COMPONENT STANDARDS (VERIFIED)

### Buttons

Source: `components/ui/button.tsx`

Available variants:

- `default`
- `secondary`
- `outline`
- `destructive`
- `ghost`
- `link`

```tsx
<Button variant="default">Primary</Button>
<Button variant="secondary" size="sm">Secondary</Button>
```

**Rule:** No custom button styles outside these variants.

---

### Forms

Stack:

- React Hook Form
- Zod
- shadcn/ui

**Rule:**

- Always wrap with `Form`
- Every form must have a Zod schema

---

### Skeleton Loaders

Location: `components/ui/skeleton/`

Centralized skeletons:

- `CardSkeleton`
- `TableSkeleton`
- `FormSkeleton`
- `DashboardSkeleton`
- `AuthSkeleton`

**Rule:**

- Never create inline loaders
- Always use centralized skeleton components

---

## 🧠 DATABASE & API RULES

- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Validation:** Zod is mandatory for all API inputs

No Zod = not production-ready.

---

## 📁 FOLDER STRUCTURE (STRICT)

```text
/app                 → Routes & layouts
/views               → Pure UI / page content
/components/ui       → Atomic shadcn-style components
/components/refine-ui→ Layout, sidebar, header, navigation
```

---

## 🔧 REFINE CONFIGURATION (VERIFIED)

- **Auth Provider:** NextAuth
- **Data Provider:** Custom REST / NestJS-style
- **Resources:** Defined in `components/refine-context.tsx`

Example:

```tsx
resources: [
  { name: "subjects", list: "/subjects" },
  { name: "departments", list: "/departments" },
  { name: "users", list: "/faculty" },
  { name: "enrollments", list: "/enrollments/create" },
  { name: "classes", list: "/classes" },
  { name: "academic-calendar", list: "/academic-calendar" },
];
```

---

## 🧾 TYPOGRAPHY STANDARDS

- **Font:** Outfit (Google Fonts Variable)
- **Spacing:** Tailwind default 4px scale

```css
.page-title {
  @apply text-3xl font-bold text-foreground tracking-tight;
}
```

Use `.text-gradient-orange` for high-importance headers only.

---

## 🚀 NEW PAGE IMPLEMENTATION RULES

### Example: Academic Calendar Page

```
app/academic-calendar/page.tsx
```

```tsx
export default function AcademicCalendarPage() {
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Academic Calendar 2026</h1>
      <div className="intro-row">
        <p>View and manage the official university academic calendar.</p>
      </div>
      {/* ... Content ... */}
    </ListView>
  );
}
```

### Loading State

```
app/academic-calendar/loading.tsx
```

```tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
```

---

## ✅ VIBE CODER VERIFICATION CHECKLIST

Before shipping:

- Container spacing matches verified pattern
- Layout hierarchy is preserved
- Colors use CSS variables only
- Buttons use approved variants
- Forms use Zod + Form wrapper
- Skeletons are centralized
- Typography uses Outfit
- Resource is registered in Refine context
- Always use our components ui dont create another ui components
- Always organize, Clean, Maintainable docummented code
- strictly avoid the component god file
- strictly follow the Fundamentals
- use always the modern code 2026 this is the documentation of Next Js the one that we use Next js https://nextjs.org/

---

## 🧠 VIBE CODER PRINCIPLES (ENFORCED)

**Systemic Thinking**

- End-to-end flow is understood
- Layout and data flow respected

**Fundamental Engineering**

- Real Tailwind v4 + OKLCH usage
- Verified component references

**Entrepreneur Execution**

- Builds on working systems
- Ships consistent, scalable features

---

## 🛠️ QUICK VERIFICATION COMMANDS

```bash
# Verify container usage
grep -r "container mx-auto" components/ app/

# Verify color variables
grep -r "var(--primary)" components/ app/

# List skeleton components
find components/ui/skeleton -name "*.tsx"

# Inspect layout source
cat components/refine-ui/layout/layout.tsx | head -50
```

---

### 🧠 Vibe Coder Mantra

> **"Verify reality. Document truth. Build consistently."**
