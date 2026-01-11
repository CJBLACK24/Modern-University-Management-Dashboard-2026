# 📂 Academic Infrastructure Suite - Folder Structure

Here's a comprehensive breakdown of your project's folder structure with descriptions:

## 🗂️ Root Level
- **/** - Root directory of the Academic Infrastructure Suite
- **.dockerignore** - Docker ignore configuration for containerization
- **.env.example** - Example environment variables template
- **.env.local** - Local environment variables (database, auth, API keys)
- **.gitignore** - Git ignore patterns for version control
- **Dockerfile** - Docker container configuration for deployment
- **drizzle.config.ts** - Drizzle ORM configuration for database migrations
- **eslint.config.mjs** - ESLint configuration for code quality
- **globals.css** - Global stylesheet with design system tokens
- **next.config.ts** - Next.js application configuration
- **next-env.d.ts** - Next.js TypeScript declarations
- **package.json** - NPM dependencies and project scripts
- **postcss.config.mjs** - PostCSS configuration for CSS processing
- **proxy.ts** - API proxy middleware for backend communication
- **tsconfig.json** - TypeScript compiler configuration
- **README.md** - Project documentation and setup guide
- **RULES.md** - Development rules and best practices
- **PROJECT_ARCHITECTURE.md** - System architecture documentation
- **COMMIT_MESSAGE.md** - Commit message guidelines

## 📁 /app - Next.js App Router
- **/app** - Next.js 14+ App Router directory (routes & layouts)
- **favicon.ico** - Application favicon
- **layout.tsx** - Root layout with providers and global structure
- **page.tsx** - Home page / dashboard redirect
- **loading.tsx** - Global loading state component
- **global-error.tsx** - Global error boundary handler
- **not-found.tsx** - 404 error page
- **globals.css** - App-level global styles

### /app/api - API Routes
- **/app/api** - Next.js API routes for backend logic
- **/app/api/auth/[...all]** - NextAuth.js authentication endpoints
  - **route.ts** - Catch-all auth route handler (login, register, etc.)
- **/app/api/classes** - Class management API endpoints
  - **route.ts** - GET (list), POST (create) classes
  - **[id]/route.ts** - GET (show), PATCH (update), DELETE operations
  - **[id]/users/route.ts** - Manage enrolled users in a class
  - **join/route.ts** - Join a class endpoint
- **/app/api/departments** - Department management API
  - **route.ts** - CRUD operations for departments list
  - **[id]/route.ts** - Individual department operations
  - **[id]/classes/route.ts** - Classes within a department
  - **[id]/subjects/route.ts** - Subjects within a department
  - **[id]/users/route.ts** - Faculty/staff in a department
- **/app/api/subjects** - Subject/course management API
  - **route.ts** - List and create subjects
  - **[id]/route.ts** - Individual subject CRUD
  - **[id]/classes/route.ts** - Classes for a specific subject
  - **[id]/users/route.ts** - Users enrolled in subject
- **/app/api/enrollments** - Student enrollment API
  - **route.ts** - Enrollment list and creation
  - **join/route.ts** - Join class/subject endpoint
  - **utils.ts** - Enrollment helper functions
- **/app/api/users** - User management API
  - **route.ts** - User list and creation
  - **[id]/route.ts** - Individual user CRUD operations
  - **[id]/departments/route.ts** - User's departments
  - **[id]/subjects/route.ts** - User's subjects
- **/app/api/stats** - Dashboard statistics API
  - **charts/route.ts** - Chart data for analytics
  - **latest/route.ts** - Latest activity feed
  - **overview/route.ts** - Dashboard overview metrics

### /app/classes - Class Routes
- **/app/classes** - Class management pages
  - **page.tsx** - Classes list page
  - **loading.tsx** - Loading skeleton for classes
- **/app/classes/create** - Create new class
  - **page.tsx** - Class creation form page
  - **loading.tsx** - Create page loading state
- **/app/classes/edit/[id]** - Edit existing class
  - **page.tsx** - Class edit form
  - **loading.tsx** - Edit page loading state
- **/app/classes/show/[id]** - View class details
  - **page.tsx** - Class detail view with enrollments
  - **loading.tsx** - Detail page loading state

### /app/departments - Department Routes
- **/app/departments** - Department management pages
  - **page.tsx** - Departments list page
  - **loading.tsx** - Loading skeleton
- **/app/departments/create** - Create department
  - **page.tsx** - Department creation form
  - **loading.tsx** - Loading state
- **/app/departments/edit/[id]** - Edit department
  - **page.tsx** - Department edit form
  - **loading.tsx** - Loading state
- **/app/departments/show/[id]** - View department
  - **page.tsx** - Department details with faculty
  - **loading.tsx** - Loading state

### /app/subjects - Subject Routes
- **/app/subjects** - Subject/course management pages
  - **page.tsx** - Subjects list page
  - **loading.tsx** - Loading skeleton
- **/app/subjects/create** - Create subject
  - **page.tsx** - Subject creation form
  - **loading.tsx** - Loading state
- **/app/subjects/edit/[id]** - Edit subject
  - **page.tsx** - Subject edit form
  - **loading.tsx** - Loading state
- **/app/subjects/show/[id]** - View subject
  - **page.tsx** - Subject details page
  - **loading.tsx** - Loading state

### /app/faculty - Faculty Routes
- **/app/faculty** - Faculty/staff management pages
  - **page.tsx** - Faculty list page
  - **loading.tsx** - Loading skeleton
- **/app/faculty/create** - Add faculty member
  - **page.tsx** - Faculty creation form
  - **loading.tsx** - Loading state
- **/app/faculty/edit/[id]** - Edit faculty
  - **page.tsx** - Faculty edit form
  - **loading.tsx** - Loading state
- **/app/faculty/show/[id]** - View faculty
  - **page.tsx** - Faculty profile page
  - **loading.tsx** - Loading state

### /app/enrollments - Enrollment Routes
- **/app/enrollments** - Student enrollment management
- **/app/enrollments/create** - Create enrollment
  - **page.tsx** - Enrollment form
- **/app/enrollments/join** - Join class flow
  - **page.tsx** - Class joining interface
- **/app/enrollments/confirm** - Confirm enrollment
  - **page.tsx** - Enrollment confirmation page

### /app/login & /app/register - Auth Routes
- **/app/login** - Login page route
  - **page.tsx** - Login form page
- **/app/register** - Registration page route
  - **page.tsx** - User registration form

## 📁 /views - Refine.js View Components
- **/views** - Refine.js resource views (separate from routes)
  - **dashboard.tsx** - Main dashboard view with stats and charts
- **/views/classes** - Class resource views
  - **list.tsx** - Classes data table view
  - **create.tsx** - Class creation form logic
  - **edit.tsx** - Class edit form logic
  - **show.tsx** - Class detail view logic
- **/views/departments** - Department resource views
  - **list.tsx** - Departments data table
  - **create.tsx** - Department creation form
  - **edit.tsx** - Department edit form
  - **show.tsx** - Department detail view
- **/views/subjects** - Subject resource views
  - **list.tsx** - Subjects data table
  - **create.tsx** - Subject creation form
  - **edit.tsx** - Subject edit form
  - **show.tsx** - Subject detail view
- **/views/faculty** - Faculty resource views
  - **list.tsx** - Faculty data table
  - **create.tsx** - Faculty creation form
  - **edit.tsx** - Faculty edit form
  - **show.tsx** - Faculty detail view
- **/views/enrollments** - Enrollment views
  - **create.tsx** - Enrollment creation form
  - **join.tsx** - Join class interface
  - **confirm.tsx** - Enrollment confirmation
- **/views/login** - Auth views
  - **index.tsx** - Login form component
- **/views/register** - Registration views
  - **index.tsx** - Registration form component

## 📁 /components - Reusable Components
- **/components** - Reusable UI components
  - **refine-context.tsx** - Refine.js context provider wrapper
  - **skeletons.tsx** - Loading skeleton components
  - **auth-skeleton.tsx** - Authentication page skeleton
  - **upload-widget.tsx** - Cloudinary upload widget component

### /components/ui - Shadcn UI Components
- **/components/ui** - Shadcn UI component library (47 components)
  - **accordion.tsx** - Collapsible accordion component
  - **alert-dialog.tsx** - Modal alert dialog
  - **alert.tsx** - Alert notification component
  - **animated-logo.tsx** - Custom animated logo component
  - **aspect-ratio.tsx** - Aspect ratio container
  - **avatar.tsx** - User avatar component
  - **badge.tsx** - Badge/tag component
  - **breadcrumb.tsx** - Navigation breadcrumbs
  - **button.tsx** - Button with variants
  - **calendar.tsx** - Date picker calendar
  - **card.tsx** - Card container component
  - **carousel.tsx** - Image/content carousel
  - **chart.tsx** - Recharts wrapper for analytics
  - **checkbox.tsx** - Checkbox input
  - **collapsible.tsx** - Collapsible container
  - **command.tsx** - Command palette / search
  - **context-menu.tsx** - Right-click context menu
  - **dialog.tsx** - Modal dialog
  - **drawer.tsx** - Slide-out drawer
  - **dropdown-menu.tsx** - Dropdown menu component
  - **form.tsx** - Form wrapper with validation
  - **hover-card.tsx** - Popover on hover
  - **input-otp.tsx** - OTP input field
  - **input.tsx** - Text input component
  - **label.tsx** - Form label
  - **menubar.tsx** - Application menubar
  - **navigation-menu.tsx** - Navigation menu
  - **pagination.tsx** - Table pagination
  - **popover.tsx** - Popover component
  - **progress.tsx** - Progress bar
  - **radio-group.tsx** - Radio button group
  - **resizable.tsx** - Resizable panels
  - **scroll-area.tsx** - Custom scrollbar area
  - **select.tsx** - Select dropdown
  - **separator.tsx** - Visual separator
  - **sheet.tsx** - Side sheet overlay
  - **sidebar.tsx** - Application sidebar
  - **skeleton.tsx** - Loading skeleton
  - **slider.tsx** - Range slider
  - **sonner.tsx** - Toast notifications (Sonner)
  - **switch.tsx** - Toggle switch
  - **table.tsx** - Data table component
  - **tabs.tsx** - Tab navigation
  - **textarea.tsx** - Multi-line text input
  - **toggle-group.tsx** - Toggle button group
  - **toggle.tsx** - Toggle button
  - **tooltip.tsx** - Tooltip component

### /components/refine-ui - Refine.js UI Components
- **/components/refine-ui** - Custom Refine.js UI components
- **/components/refine-ui/buttons** - Action button components
  - **back.tsx** - Navigate back button
  - **clone.tsx** - Clone resource button
  - **create.tsx** - Create new resource button
  - **delete.tsx** - Delete resource button with confirmation
  - **edit.tsx** - Edit resource button
  - **list.tsx** - View list button
  - **refresh.tsx** - Refresh data button
  - **show.tsx** - Show detail button
- **/components/refine-ui/data-table** - Data table components
  - **column-header.tsx** - Sortable column header
  - **pagination.tsx** - Table pagination controls
  - **toolbar.tsx** - Table toolbar with filters
  - **view-options.tsx** - Column visibility toggle
- **/components/refine-ui/form** - Form components
  - **field.tsx** - Form field wrapper
  - **section.tsx** - Form section grouping
- **/components/refine-ui/layout** - Layout components
  - **header.tsx** - Page header component
  - **breadcrumb.tsx** - Dynamic breadcrumb navigation
  - **layout.tsx** - Main layout wrapper
  - **menu.tsx** - Sidebar menu
  - **sider.tsx** - Sidebar component
  - **title.tsx** - Logo/title component
  - (+3 more layout files) - Additional layout utilities
- **/components/refine-ui/notification** - Notification system
  - **provider.tsx** - Notification provider
  - **toast.tsx** - Toast notification component
  - (+1 more) - Notification utilities
- **/components/refine-ui/theme** - Theme components
  - **provider.tsx** - Theme provider (dark/light mode)
  - **toggle.tsx** - Theme toggle button
  - (+1 more) - Theme utilities
- **/components/refine-ui/views** - View components
  - **edit.tsx** - Edit view wrapper
  - **create.tsx** - Create view wrapper
  - **show.tsx** - Show view wrapper
  - **list.tsx** - List view wrapper

## 📁 /lib - Library & Utilities
- **/lib** - Core library utilities and configurations
  - **auth.ts** - NextAuth.js authentication configuration
  - **auth-client.ts** - Client-side auth utilities
  - **cloudinary.ts** - Cloudinary SDK configuration for uploads
  - **env.ts** - Zod validation for environment variables
  - **pusher.ts** - Pusher real-time websocket configuration
  - **schema.ts** - Zod validation schemas for forms
  - **utils.ts** - General utility functions (cn, formatters)

## 📁 /db - Database Layer
- **/db** - Database schema and connection
  - **index.ts** - Drizzle database instance
- **/db/schema** - Database schema definitions
  - **app.ts** - Application tables (classes, departments, subjects, enrollments)
  - **auth.ts** - Authentication tables (users, sessions, accounts)
  - **index.ts** - Schema exports

## 📁 /providers - Context Providers
- **/providers** - Refine.js provider configurations
  - **auth.ts** - Refine.js auth provider implementation
  - **data.ts** - Refine.js data provider (REST API)
  - **live.ts** - Refine.js live/realtime provider (Pusher)

## 📁 /hooks - Custom React Hooks
- **/hooks** - Custom React hooks
  - **use-mobile.ts** - Mobile viewport detection hook

## 📁 /types - TypeScript Types
- **/types** - Global TypeScript type definitions
  - **index.ts** - Application-wide type definitions

## 📁 /constants - Constants
- **/constants** - Application constants
  - **index.ts** - App-wide constants and enums

## 📁 /seed - Database Seeding
- **/seed** - Database seeding scripts
  - **seed.ts** - Main seeding script
  - **data.json** - Seed data payload

## 📁 /public - Static Assets
- **/public** - Public static assets
  - **favicon.ico** - Browser favicon
  - **logo.png** - Application logo
  - **PERN-University.png** - University branding image
  - **calendar-2026-with-holidays-PH.pdf** - 2026 Philippine holidays calendar

## 📊 Summary Statistics
- **Total Directories**: ~25+ main directories
- **Total TypeScript/TSX Files**: ~88 (excluding node_modules)
- **API Routes**: 24 route handlers
- **UI Components**: 47 Shadcn components + 30+ Refine UI components
- **Resource Views**: 22 Refine.js views (CRUD operations)
- **App Routes**: 30+ Next.js pages

## 🔑 Key Architecture Highlights
- **Next.js 14 App Router** - Modern file-based routing with server components
- **Refine.js Integration** - Admin panel framework with data providers
- **Shadcn UI** - Beautiful, accessible component library
- **Drizzle ORM** - Type-safe PostgreSQL database layer
- **NextAuth.js** - Secure authentication system
- **Zod Validation** - Runtime type checking and validation
- **Pusher** - Real-time updates via WebSockets
- **Cloudinary** - Cloud-based file uploads

This structure follows a clean architecture pattern with clear separation between:
- **Routes (/app)** - Next.js pages and API endpoints
- **Views (/views)** - Refine.js view logic
- **Components (/components)** - Reusable UI
- **Business Logic (/lib, /providers)** - Core functionality
- **Data Layer (/db)** - Database schema