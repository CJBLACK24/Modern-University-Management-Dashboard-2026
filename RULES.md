# **RULES.md - AI Agent Guidelines for Academic Infrastructure Suite**

## **1. PROJECT CONTEXT & VISION**

You are assisting in building a **production-ready, multi-role University Dashboard Management System**. This is a **Unified Next.js Fullstack application**. The goal is to create a secure, type-safe, and scalable academic hub for Admins, Teachers, and Students. Always prioritize:

- **Security & Type Safety**
- **Clean, Modular Architecture**
- **Performance & Scalability**

## **2. CORE TECH STACK MANDATE**

**NEVER DEVIATE FROM THESE TECHNOLOGIES.** All code, architecture, and tooling suggestions must strictly adhere to this stack:

### **🔵 FULLSTACK FRAMEWORK**

- **Framework:** Next.js (App Router) combined with Refine.
- **Language:** TypeScript - Enforce strict typing. No `any` types.
- **Refine Integration:** Use Refine's data providers, auth providers, and hooks for CRUD/routing/auth flows within Next.js.
- **Styling:** Tailwind CSS - Utility-first.
- **UI Components:** **shadcn/ui** libraries.

### **🟢 BACKEND & DATA LAYER**

- **Runtime:** Node.js (via Next.js Route Handlers in `app/api`).
- **Database:** PostgreSQL on **NeonDB** (serverless).
- **ORM:** **Drizzle ORM** exclusively.
- **Authentication:** **Better-Auth** for end-to-end auth.
- **Security:** **Arcjet** for protection.
- **Media:** **Cloudinary**.

## **3. PRODUCTION-READY STANDARDS (CRITICAL)**

### **3.1 Performance Optimized**

- **Server Components**: Prefer React Server Components (RSC) for initial static content.
- **Image Optimization**: ALWAYS use `next/image` or Cloudinary's `<AdvancedImage>` for assets. Do NOT use `<img>` tags.
- **Code Splitting**: Use dynamic imports (`next/dynamic`) for heavy components.
- **Caching**: Leverage Next.js data cache where appropriate.

### **3.2 Excellent Zod Validation**

- **Strict Schemas**: Every API route's request body and query params must be validated with Zod.
- **Forms**: Use `react-hook-form` along with Zod resolvers for client-side forms.
- **Type Parity**: Ensure Zod schemas strictly match Drizzle types and TypeScript interfaces.

### **3.3 Scalable**

- **Modular Architecture**:
  - `views/`: Feature-specific UI pages.
  - `components/`: Reusable UI atoms and molecules.
  - `providers/`: Context and Data providers.
  - `lib/`: Shared utilities.
- **Database Indexing**: Always confirm database indexes exist for frequently queried columns in Drizzle schemas.

### **3.4 Robustness**

- **Error Boundaries**: Implement `error.tsx` in Next.js routes to gracefully catch runtime errors.
- **API Error Handling**: Consistent JSON error responses `{ error: string, code?: number }`.
- **Loading States**: Use Suspense boundaries and Skeleton components (`components/ui/skeleton`) instead of blank screens.

### **3.5 Efficient**

- **DRY Principle**: Don't repeat logic. Extract to custom hooks or utility functions.
- **Optimized Queries**: Select only necessary columns in Drizzle queries (`.select({ ...unique fields })`) rather than `select()`.

### **3.6 Complexity Management**

- **Readability**: Write self-documenting code. Add comments for complex auth logic or data transformations.
- **Refactoring**: If a component exceeds 250 lines, propose breaking it down into smaller sub-components.

## **4. IMPLEMENTATION GUIDELINES**

### **4.1 Unified Architecture**

- **Frontend & Backend** coexist.
- **API Routes**: Located in `app/api/...`.
- **Middleware**: Use `proxy.ts` (Next.js middleware) for route protection.

### **4.2 Coding Rules**

1. **Drizzle ORM**: No raw SQL. Use the query builder.
2. **Better-Auth**: Use the client and server libraries provided (`lib/auth.ts`, `lib/auth-client.ts`).
3. **Refine**: Utilize `useList`, `useOne`, `useCreate` hooks for data interaction on the client.

## **5. PROHIBITED ACTIONS**

❌ **Never suggest:**

- Switching to Express.js as a separate service (we are Unified Next.js).
- Switching to Prisma.
- Using `any` or `ts-ignore`.
- Hardcoding secrets.
- Committing `.env` files.
- Using standard `<img>` tags (Always `next/image` or Cloudinary).

---

**Remember:** This is a **production-grade system**. Every line of code should reflect security, type safety, and maintainability.
