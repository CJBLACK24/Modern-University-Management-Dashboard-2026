# Academic Infrastructure Suite 🔋

<div align="center">
  <img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/REFINE-22C55E?style=for-the-badge&logo=refine&logoColor=white" />
  <img src="https://img.shields.io/badge/TAILWIND-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/POSTGRESQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/NEONDB-00E599?style=for-the-badge&logo=neon&logoColor=white" />
  <img src="https://img.shields.io/badge/DRIZZLE-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" />
  <img src="https://img.shields.io/badge/BETTER--AUTH-000000?style=for-the-badge&logo=better-auth&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/CLOUDINARY-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/ARCJET-2D1F6E?style=for-the-badge&logo=arcjet&logoColor=white" />
  <img src="https://img.shields.io/badge/SITE24X7-2ECC71?style=for-the-badge&logo=site24x7&logoColor=white" />
  <img src="https://img.shields.io/badge/CODERABBIT-FF6600?style=for-the-badge&logo=coderabbit&logoColor=white" />
</div>

A state-of-the-art, comprehensive academic management system built with Next.js 15, Refine, and Drizzle ORM. Designed for scalability, security, and visual excellence.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Admin Engine:** [Refine.js](https://refine.dev/) (Data Provider, Auth Provider, Live Provider)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI, Framer Motion (Glassmorphism & Micro-animations)
- **Database:** PostgreSQL ([Neon DB](https://neon.tech/)), [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (Magic Link, Google & GitHub OAuth)
- **Email Delivery:** [Resend](https://resend.com/)
- **Real-time Updates:** [Pusher WebSockets](https://pusher.com/)
- **File Management:** [Cloudinary](https://cloudinary.com/) (Hosted profile & class assets)
- **Security:** [Arcjet](https://arcjet.com/) (Bot protection & Rate limiting)

## ✨ Core Features

### 🔐 Multi-Role Authentication & Security

- **Passwordless Entry**: Secure login via **Better Auth Magic Links** delivered through **Resend**.
- **OAuth Support**: Instant access using Google or GitHub accounts.
- **Dynamic Routing**: Automatic redirection to Student, Teacher, or Admin dashboards based on role-based permissions.

### 📊 Unified Analytics Dashboard

- **Real-Time Statistics**: High-level overview of users, active classes, subjects, and departments.
- **Pusher Integration**: Charts and metrics update instantly as soon as data changes in the database via the **Refine Live Provider**.

### 📖 Academic Management

- **Intelligent Subjects**: Centralized curriculum control with advanced filtering and drill-down class views.
- **Departmental Governance**: Structural organization of subjects and faculties.
- **Class Orchestration**: Schedule sessions, manage capacity, and assign teachers using a robust Drizzle-powered engine.

### 🎟️ Code-Based Enrollment System

- **"Google Classroom" Style**: Students can join courses instantly by entering a unique **6-8 digit invite code**, ensuring a friction-less enrollment process.

### 👤 Faculty & Profile Management

- **Dynamic Directory**: Paginated directory with advanced search functionality.
- **Cloudinary Integration**: Fully integrated profile image uploads and automatic asset optimization.

---

## 🚦 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd academic-infrastructure-suite
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy `.env.example` to `.env.local` and provide your API keys.

    ```bash
    cp .env.example .env.local
    ```

    > [!IMPORTANT]
    > For local development, ensure `BETTER_AUTH_URL` is set to `http://localhost:3000`.

4.  **Database Sync:**

    ```bash
    npx drizzle-kit push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## 🏗️ Architecture

The project follows a modular architecture:

- `app/api`: Serverless route handlers for data management.
- `providers/`: Refine bridge for data, auth, and live updates.
- `views/`: Feature-specific UI components grouped inside Refine routes.
- `db/schema/`: Type-safe schema definitions for Drizzle.

---

## 🔋 Highlights

- **Vibrant Aesthetics**: Modern dark mode with glowing gradients and responsive layouts.
- **Scalability**: Optimized for hundreds of concurrent users with real-time feedback.
- **Performance**: Leveraging Next.js 15 Turbopack for ultra-fast development and deployment.
