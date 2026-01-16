# RULES.md — VERIFIED DEVELOPMENT PROTOCOL v2.0 (2026 Edition)

_Status: Production-Ready / Extreme Responsiveness Enabled_  
_Last Verified: 2026-01-17_

---

## 🎯 CORE MINDSET: THE SENIOR ARCHITECT / VIBE CODER

1.  **Systemic Integration**
    *   Think in full-stack architecture: **User → View → Controller/API → Model/Database**.
    *   No feature is complete until it handles loading, error, and empty states gracefully.

2.  **Uncompromising Responsiveness (Mobile-First)**
    *   **Mobile-First is NOT optional.** Every component must be built starting from `base` (mobile) and scaled up via Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
    *   **The 3-Device Test:** Every UI change must be verified on Mobile (390px), Tablet (768px), and Desktop (1440px).

3.  **Fundamental Excellence**
    *   **Visual Fidelity:** Use OKLCH color systems for perceptually uniform gradients and states.
    *   **Accessibility:** Semantic HTML is the foundation. ARIA labels and keyboard navigation are standard.
    *   **Robustness:** Zod-driven validation for all inputs, outputs, and environment variables.

---

## 🏗️ ARCHITECTURAL STANDARDS

### 1. Adaptive Layout & Container Patterns

**Mandatory Page Wrapper:**
```tsx
<Authenticated>
  <Layout>{children}</Layout>
</Authenticated>
```

**Verified Responsive Container Classes:**
*   **Mobile (Default):** `px-4 pt-4 w-full overflow-x-hidden`
    *   *Rule:* Use `px-4` minimum for breathing room on small screens.
*   **Tablet (`md:`):** `md:p-6`
*   **Desktop (`lg:`):** `lg:px-8 lg:pt-8 max-w-[1600px] mx-auto`

### 2. Layout Stability (Zero Shift Policy)
*   **Avoid Jumpiness:** Use fixed-height skeletons or minimum heights (`min-h-[...]`) for dynamic content containers.
*   **Interaction Stability:** Selectors, dropdowns, and modals must not cause layout shifts in the underlying page content. Use absolute positioning or portals for overlays.

---

## 🎨 DESIGN SYSTEM & RESPONSIVENESS (Tailwind v4 / OKLCH)

### Responsive Typography & Spacing
*   **Fluid Text:** Use clamped or responsive font sizes: `text-xl md:text-2xl lg:text-3xl`.
*   **Stacking Logic:** Elements that are horizontal on desktop `flex-row` **must** stack vertically on mobile `flex-col` unless explicitly horizontal (like icons).

### Responsive Charts (Recharts/Victory/etc)
*   **Label Management:** On mobile, rotate labels `angle={-45}` or hide every Nth label to prevent overlap.
*   **Aspect Ratio:** Use `ResponsiveContainer` and adjust `aspect` props based on screen size (e.g., `aspect={1}` for mobile, `aspect={1.6}` for desktop).

### Component Hierarchy
```text
<RefineContext>
└── <RootLayout>
    └── <Authenticated>
        └── <Layout>
            ├── <Sidebar> (Collapsible/Drawer on Mobile)
            ├── <Header> (Sticky with Mobile Menu Trigger)
            ├── <Breadcrumb> (Hidden or Truncated on Mobile)
            └── <Main>
                └── {Page Content}
```

---

## 🔘 COMPONENT STANDARDS (STRICT)

### Form & Input Excellence
*   **Touch Targets:** Inputs and buttons must be at least `h-11` on mobile for easy tapping.
*   **Dropdowns:** Use mobile-optimized sheets or drawers for complex selectors if the dropdown list is long.

### Centralized Loading (Skeletons)
*   Location: `components/ui/skeleton/`
*   **Rule:** Every page/component MUST have a corresponding skeleton that matches its final layout exactly to minimize visual pop-in.

---

## 🧠 TECHNICAL STACK & DATABASE
*   **Next.js 14/15:** App Router, Server Components by default.
*   **Tailwind CSS:** Utility-first, strict adherence to the configuration.
*   **Drizzle ORM:** For type-safe database interactions.
*   **Zod:** Mandatory for all API schemas and Form validation.
*   **Refine:** For rapid dashboard orchestration.

---

## 📁 FOLDER STRUCTURE (ENFORCED)
```text
/app                 → Routes, Layouts, Loading, Error states
/views               → Domain-specific Page Components (Keep logic here)
/components/ui       → Atomic, Reusable primitives (shadcn-style)
/components/refine-ui→ Layout, Sidebar, Header, Branded navigation
/lib                 → Utilities, Constants, Zod Schemas
/hooks               → Reusable React hooks
```

---

## ✅ VIBE CODER COMPLETION CHECKLIST

1.  [ ] **Breakpoint Check:** Is it broken on 390px? 768px? 1024px?
2.  [ ] **Stability Check:** Does clicking a selector move the page?
3.  [ ] **Stacking Check:** Do grids collapse to 1 column on mobile?
4.  [ ] **Color Check:** Using `var(--primary)` or `oklch`? (No hex codes)
5.  [ ] **Validation Check:** Is there a Zod schema for this form/API?
6.  [ ] **Cleanliness Check:** Is this a "God File"? (If > 300 lines, split it).
7.  [ ] **UX Check:** Does it feel premium? Are there micro-animations (Framer Motion)?

---

## 🛠️ QUICK VERIFICATION COMMANDS
```bash
# Check for non-responsive grid usage
grep -r "grid-cols-[23456789]" app/ views/ | grep -v "md:"

# Check for hardcoded colors
grep -r "#[0-9a-fA-F]\{3,6\}" app/ views/

# Verify responsive container padding
grep -r "px-" app/layout.tsx components/refine-ui/layout/
```

---

### 🧠 Senior Mantra
> **"Mobile is the primary user experience. Desktop is the luxury extension. Build for the small, optimize for the large."**
