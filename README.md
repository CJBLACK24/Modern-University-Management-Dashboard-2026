<div align="center">
  <br />
    <a href="https://github.com/adrianhajdin/classroom-frontend" target="_blank">
      <img src="public/PERN-University.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_19-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-Next.js_15-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextjs" />
    <img src="https://img.shields.io/badge/-Refine-black?style=for-the-badge&logoColor=white&logo=refine&color=2FA1D6" alt="refine" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <div>
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Drizzle_ORM-black?style=for-the-badge&logoColor=white&logo=drizzle&color=C5F74F" alt="drizzle" />
    <img src="https://img.shields.io/badge/-Neon_DB-black?style=for-the-badge&logoColor=white&logo=neon&color=00E599" alt="neon" />
    <img src="https://img.shields.io/badge/-Better--Auth-black?style=for-the-badge&logoColor=white&logo=authy&color=EB34E8" alt="better-auth" />
  </div>

  <h3 align="center">Academic Infrastructure Suite (AIS)</h3>

   <div align="center">
     A production-ready University Management Dashboard built with the PERN stack.
    </div>
</div>

## 📋 Table of Contents

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🧠 [Logic Workflow](#logic-workflow)
5. 🤸 [Quick Start](#quick-start)
6. 🐋 [Docker Deployment](#docker)
7. 🛡️ [Project Architecture](#project-architecture)

<a name="introduction"></a>

## 🚀 Introduction

**Academic Infrastructure Suite (AIS)** is a comprehensive, enterprise-level university management system. Built using the modern PERN stack (Postgres, Express/Next, React, Node), it leverages the power of **Refine** for rapid internal tool development and **Drizzle ORM** for type-safe database interactions.

Designed for administrators, teachers, and students, AIS provides a seamless experience for managing academic resources, from subjects and classes to faculty directories and enrollment.

<a name="tech-stack"></a>

## ⚙️ Tech Stack

### Frontend

- **React 19 & Next.js 16**: Modern UI framework and App Router.
- **Refine**: The framework for data-intensive web applications.
- **Tailwind CSS & Shadcn/UI**: Beautiful, responsive, and accessible UI components.
- **Framer Motion & GSAP**: High-performance animations and interactive elements.
- **Zustand**: Lightweight state management.

### Backend & Database

- **Drizzle ORM**: Next-generation TypeScript ORM.
- **Neon Database**: Serverless PostgreSQL.
- **Better-Auth**: Secure and flexible authentication adapter.
- **Arcjet**: Bot detection and security shielding.

### Tools & Integrations

- **Cloudinary**: Management and delivery of image assets for faculty and class banners.
- **Pusher**: Real-time subscriptions and updates.
- **Nodemailer / Resend**: Transactional email services.

<a name="features"></a>

## 🔋 Features

👉 **Multi-Role Authentication**: A secure entry system powered by **Better Auth** and **Arcjet** that dynamically routes Students, Teachers, and Admins to protected dashboards with strict role-based permissions.

👉 **Unified Analytics Dashboard**: A high-level overview of the institution's health, featuring real-time statistics on student enrollment, active classes, and faculty distribution via Refine's data providers.

👉 **Intelligent Subject Management**: Centralized control for curriculum where you can create subjects, apply instant filters, and drill down into specific class assignments and teacher workloads.

👉 **Departmental Governance**: A structural management layer that organizes subjects and faculties into departments, providing detailed views of every student and educator within a specific academic branch.

👉 **Dynamic Faculty Directory**: A robust, paginated directory of all professors featuring advanced search by name or email, profile image hosting via Cloudinary, and full teaching schedule visibility.

👉 **Advanced Class Orchestration**: The core engine of the app built with **Drizzle ORM**, allowing Admins to schedule sessions, set capacity limits, and manage complex assignments of multiple teachers across different sections.

👉 **Code-Based Enrollment System**: A "Google Classroom" inspired workflow where students gain instant access to courses by entering a unique 6-8 digit joining code, ensuring a secure and controlled-access environment.

<a name="logic-workflow"></a>

## 🧠 Logic Workflow

The AIS system operates on a hierarchical logic flow designed for academic integrity and operational efficiency:

1.  **Identity & Access (IAM)**: Upon registration, users are assigned specific roles. **Arcjet** monitors for suspicious activity, while **Better Auth** manages session security. Access to resources (Actions, Views) is strictly gated by these roles.
2.  **Structural Foundation**: Admins first define **Departments**. These departments then house **Subjects**. This hierarchy ensures that every piece of curriculum is logically anchored within the institution.
3.  **The Orchestration Engine**: Once subjects are created, Admins use the **Class Orchestration** module to instantiate specific class sections. This involves linking a Subject to a Teacher, setting a Banner via Cloudinary, and defining capacity constraints using Drizzle-powered relations.
4.  **Enrollment Lifecycle**: Students interact with the system primarily through the **Code-Based Enrollment System**. When an Admin generates a class, a unique code is attached. Students input this code, triggering a backend validation that checks capacity and prerequisites before creating an enrollment record.
5.  **Data Feedback Loop**: Every interaction (new user, new class, new enrollment) is captured and processed into the **Unified Analytics Dashboard**. This provides a real-time pulse of the university's operations.

<a name="quick-start"></a>

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/academic-infrastructure-suite.git
cd academic-infrastructure-suite
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the content from `.env.example`. Replace the placeholders with your actual credentials:

```env
# Database (NEVER commit real database URLs)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Arcjet
ARCJET_KEY="your_arcjet_key_here"
ARCJET_ENV="development"

# Application URLs
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:3000/api"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Better Auth
BETTER_AUTH_SECRET="your_better_auth_secret_here"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_EMAIL_FROM="noreply@example.com"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL="https://api.cloudinary.com/v1_1/your_cloud_name/image/upload"

# Internal Auth Token Keys
NEXT_PUBLIC_ACCESS_TOKEN_KEY="access_token"
NEXT_PUBLIC_REFRESH_TOKEN_KEY="refresh_token"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Pusher (WebSockets)
PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_KEY="your_pusher_key"
PUSHER_SECRET="your_pusher_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="ap1"

# Resend
RESEND_API_KEY="your_resend_api_key"

EMAIL_USER=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX@gmail.com
EMAIL_PASSWORD=APPPASSWORD
EMAIL_FROM="Academic Suite <XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX@gmail.com>"
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

<a name="docker"></a>

## 🐋 Docker Deployment

Deploy the AIS system instantly using Docker:

```bash
# Build the image
docker build -t ais-platform .

# Run the container
docker run -p 3000:3000 --env-file .env.local ais-platform
```

<a name="project-architecture"></a>

## 🛡️ Project Architecture

The codebase follows a standardized enterprise structure for scalability:

- `/app`: Next.js App Router (Routes & API).
- `/components`: Atomic UI (Shadcn) and Refine-specific components.
- `/db`: Drizzle schema and database configuration.
- `/views`: Implementation of specific page layouts.
- `/lib`: External library configurations (Cloudinary, Auth).

## 📜 Development Protocol

This project follows the **[Vibe Coder Mindset](./VibeCoderMindset.md)**. All developers must adhere to the **[Verified Development Rules](./rules.md)** to ensure systemic alignment and engineering excellence.

---

> **Status**: Production Ready  
> **Stack**: PERN  
> **Theme**: Modern Dark/Light support
