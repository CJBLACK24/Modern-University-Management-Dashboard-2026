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
4. 🤸 [Quick Start](#quick-start)
5. 🛡️ [Project Architecture](#project-architecture)

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

- **Cloudinary**: Management and delivery of image assets.
- **Pusher**: Real-time subscriptions and updates.
- **Nodemailer / Resend**: Transactional email services.

<a name="features"></a>

## 🔋 Features

👉 **Multi-Role Authentication**: Secure login and signup powered by Better-Auth with role-based access control.

👉 **Unified Analytics Dashboard**: Real-time overview of university performance, student enrollment, and faculty distribution.

👉 **Subject Management**: Comprehensive system for managing academic curriculum with advanced filtering and search.

👉 **Departmental Governance**: Strategic organization and management of academic branches.

👉 **Faculty Directory**: Dynamic, paginated directory for managing educators and staff profiles.

👉 **Class Orchestration**: Advanced engine for scheduling classes, tracking capacity, and room assignments.

👉 **Skeleton Loading**: Zero-layout-shift (CLS) experience using layout-locked skeletons.

👉 **Real-time Notifications**: Instant updates via Pusher integration.

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
# Database
DATABASE_URL=your_neon_db_url

# Auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Third Party
CLOUDINARY_URL=your_cloudinary_url
PUSHER_APP_ID=your_pusher_id
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

<a name="project-architecture"></a>

## 🛡️ Project Architecture

The codebase follows a standardized enterprise structure for scalability:

- `/app`: Next.js App Router (Routes & API).
- `/components`: Atomic UI (Shadcn) and Refine-specific components.
- `/db`: Drizzle schema and database configuration.
- `/views`: Implementation of specific page layouts.
- `/lib`: External library configurations (Cloudinary, Auth).

---

> **Status**: Production Ready  
> **Stack**: PERN  
> **Theme**: Modern Dark/Light support
