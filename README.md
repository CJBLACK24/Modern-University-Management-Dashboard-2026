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
- **State Management:** Zustand
- **Analytics:** Vercel Analytics

### 🗄️ Backend Stack

- **Database:** PostgreSQL (via Neon) with Drizzle ORM
- **Authentication:** Better Auth (Google, GitHub, and Credentials)
- **Security:** Arcjet (Bot protection & Rate limiting)
- **WebSockets:** Pusher (Real-time events)
- **Media:** Cloudinary (Asset management)

### 🛠️ Dev Tools

- **Language:** TypeScript (Strict mode)
- **Validation:** Zod
- **Forms:** React Hook Form
- **Toasts:** Sonner

---

## 🔋 Features

- **👉 Multi-Role Authentication:** Secure entry with Google, GitHub, and Email/Password. Dynamic routing for Students, Teachers, and Admins.
- **👉 Real-Time Connectivity:** Full WebSocket integration via Pusher for instant dashboard updates and notifications.
- **👉 Unified Analytics Dashboard:** Real-time statistics on enrollment and faculty distribution, monitored via Vercel Analytics.
- **👉 Intelligent Subject Management:** Centralized curriculum control with advanced filtering and drill-down class views.
- **👉 Departmental Governance:** Organizational layer for managing subjects and faculties across academic branches.
- **👉 Dynamic Faculty Directory:** Paginated directory with advanced search and Cloudinary-hosted profile assets.
- **👉 Advanced Class Orchestration:** Scheduling and capacity management built with Drizzle ORM.
- **👉 Code-Based Enrollment:** unique 6-8 digit code entry for students to join courses instantly.
- **👉 Password Intelligence:** Dynamic password strength evaluation with animated Framer Motion feedback.

---

## 🤸 Quick Start

### Prerequisites

- Node.js 18+
- Neon PostgreSQL Database
- Cloudinary Account
- Pusher Account

### Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_neon_postgresql_url

# Better Auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Social Auth
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret

# Pusher (WebSockets)
PUSHER_APP_ID=your_pusher_app_id
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

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
3. Sync Database:
   ```bash
   npx drizzle-kit push
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
- `npm run db:generate` - Generate Drizzle snapshots

---

Managed with 💖 for Academic Excellence.
