# Development Rules

## Core Principles

1.  **Production Readiness:** All code must be performant, robust, and scalable.
2.  **Zod Validation:** Implement strict validation for all environment variables, API requests, and data models.
3.  **Modern Aesthetics:** UI should be premium, responsive, and follow modern design trends (glassmorphism, vibrant colors, etc.).
4.  **Error Handling:** Implement descriptive error handling and user-friendly notifications (toasts).

## Tech Stack Compliance

- **Next.js:** Always use App Router and Turbopack. Version: **16.1.1**.
- **Better Auth:** Use for all authentication flows (Magic Link, Social).
- **Drizzle ORM:** Preferred for database interactions.
- **Styling:** Vanilla CSS with Tailwind utility classes where appropriate.
- **Lucide React:** Standard library for icons.

## UI/UX Standards

- **Layout:** Ensure centering and proper spacing on all screen sizes.
- **Responsiveness:** Mobile-first approach is mandatory.
- **Performance:** Optimize images and use skeleton loaders for async data.
- **Interactions:** Use smooth transitions and micro-animations (Framer Motion).

## Authentication Workflow

- **Magic Link:** Primary method for registration and login.
- **Redirects:** Successful authentication must redirect users to the dashboard or home page.
- **Profile Data:** Capture `name`, `role`, and `image` during registration.
