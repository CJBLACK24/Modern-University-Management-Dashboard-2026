# 🎓 University Dashboard Management

A professional, high-performance academic infrastructure suite designed to streamline university operations. From student enrollment to faculty management, this platform provides a unified experience for Students, Teachers, and Admins.

---

## 📋 Table of Contents

- [✨ Introduction](#-introduction)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔋 Features](#-features)
- [🤸 Quick Start](#-quick-start)
- [🛠️ Development](#️-development)

---

## ✨ Introduction

**Academic Suite** is an intelligent management ecosystem built for modern educational institutions. It simplifies complex administrative workflows, providing real-time analytics and automated orchestration of classes, departments, and enrollment through a secure, role-based architecture.

---

## ⚙️ Tech Stack

### 🎨 Frontend Stack

- **Framework:** Next.js 15 (App Router)
- **UI Framework:** Refine.js (Enterprise-ready internal tools)
- **Styling:** Vanilla CSS + Tailwind CSS (for layout)
- **Animations:** Framer Motion (Transitions) & GSAP (Reveal effects)
- **Icons:** Lucide React

### 🗄️ Backend Stack

- **Database:** PostgreSQL (with Drizzle ORM)
- **Authentication:** Better Auth (Secure role-based access)
- **Security:** Arcjet (API protection & Rate limiting)
- **Media:** Cloudinary (Profile & banner hosting)

### 🛠️ Dev Tools

- **Language:** TypeScript (Strict mode)
- **Validation:** Zod
- **Forms:** React Hook Form
- **Toasts:** Sonner

---

## 🔋 Features

- **👉 Multi-Role Authentication:** Secure entry powered by Better Auth & Arcjet. Dynamic routing for Students, Teachers, and Admins with strict role permissions.
- **👉 Unified Analytics Dashboard:** Real-time statistics on enrollment, active classes, and faculty distribution via Refine data providers.
- **👉 Intelligent Subject Management:** Centralized curriculum control with instant filters and drill-down views for class assignments.
- **👉 Departmental Governance:** Structural organization layer for subjects and faculties within academic branches.
- **👉 Dynamic Faculty Directory:** Robust, paginated directory with advanced search, Cloudinary profile hosting, and schedule visibility.
- **👉 Advanced Class Orchestration:** Built with Drizzle ORM for scheduling sessions, setting capacity limits, and managing teacher assignments.
- **👉 Code-Based Enrollment:** "Google Classroom" style workflow where students join courses via unique 6-8 digit codes.
- **👉 Password Intelligence:** Integrated password strength indicator with real-time feedback and animated popovers.

---

## 🤸 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL Database
- Cloudinary Account (for image uploads)

### Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_postgresql_url

# Better Auth
BETTER_AUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset

# Arcjet
ARCJET_KEY=your_key
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migrations (if using Drizzle):
   ```bash
   npm run db:push
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

---

## 🛠️ Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linting checks
- `npm run db:generate` - Generate Drizzle migrations

---

Managed with 💖 for Academic Excellence.
