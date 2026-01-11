# Academic Infrastructure Suite (AIS) | Enterprise Grade ERP

![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Stack](https://img.shields.io/badge/Stack-PERN-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

> **All-in-one university management system.**  
> Seamlessly connect Faculty, Students, and Administration through a robust, scalable, and beautiful interface. built for the modern educational ecosystem.

---

## 🚀 Features

### for Administration

- **Department Hierarchy**: Manage complex organizational structures with ease.
- **Global Catalog**: Centralized subject definitions (Courses) to ensure curriculum consistency.
- **Data Visualization**: Real-time dashboards with Bar Charts, Pie Charts, and KPI cards powered by `Recharts`.
- **Audit Logging**: `updatedAt` timestamps tracking modification across all resources.

### for Faculty

- **Class Management**: Create class instances, set capacity, and manage schedules.
- **Rich Media**: Upload class banners and profile photos via Cloudinary integration.
- **Student Roster**: View enrolled students and manage access.

### for Students

- **Frictionless Enrollment**: "Join by Code" system eliminates bureaucratic delays.
- **Schedule View**: Clear visualization of enrolled classes.

---

## 🛠️ Technology Stack: The Modern PERN

We utilize a cutting-edge **PERN** variation, optimized for type safety and performance.

| Component     | Technology                       | Description                                                  |
| :------------ | :------------------------------- | :----------------------------------------------------------- |
| **P**ostgres  | **PostgreSQL** + **Drizzle ORM** | Relational data integrity with TypeScript-native ORM.        |
| **E**xpress\* | **Next.js API Routes**           | Replaces Express with serverless-ready API endpoints.        |
| **R**eact     | **Refine.js**                    | Headless enterprise UI framework for rapid CRUD development. |
| **N**ode      | **Node.js**                      | Server-side runtime environment.                             |

### Additional Powerhouse Libraries

- **UI/UX**: `Shadcn/UI` + `TailwindCSS` for pixel-perfect, accessible, and responsive design.
- **Validation**: `Zod` schema validation for bulletproof data integrity.
- **Auth**: `NextAuth.js` (custom provider) for secure session management.

---

## 🏗️ Architecture & Scalability

The system is designed with **Vertical Slicing** in mind.

- **API Layer**: Located in `app/api/`. Each resource has dedicated isolation (`GET`, `POST`, `PATCH`, `DELETE`).
- **View Layer**: Located in `views/`. Decoupled from logic, focusing purely on presentation.
- **Data Layer**: Located in `db/schema`. Single source of truth for data models.

### Key Scalability Features

1.  **Server-Side Pagination**: All lists (`useTable`) support server-side pagination to handle thousands of records.
2.  **Optimized Assets**: Images served via CDN (Cloudinary).
3.  **Type Safety**: End-to-end TypeScript from Database -> API -> Frontend.

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database
- Cloudinary Account

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-org/academic-suite.git
    cd academic-infrastructure-suite
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file:

    ```env
    DATABASE_URL=postgres://user:pass@localhost:5432/ais_db
    NEXTAUTH_SECRET=your_super_secret
    CLOUDINARY_URL=cloudinary://...
    ```

4.  **Database Migration**

    ```bash
    npm run db:push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 🤝 Contribution & Workflow

Please refer to our internal documentation for detailed workflows:

- [Business Logic Workflow](./.gemini/antigravity/brain/fccb0049-d00a-4c04-83bd-27a8094d531e/BusinessWorkflow.md)
- [Application Sitemap](./.gemini/antigravity/brain/fccb0049-d00a-4c04-83bd-27a8094d531e/sitemap.md)

---

**Academic Infrastructure Suite** — _Empowering Education through Technology._
