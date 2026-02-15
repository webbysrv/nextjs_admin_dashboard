# Nexus Admin Dashboard

A high-performance, full-stack admin dashboard built with **Next.js 15 (App Router)**, **Prisma 7**, and **PostgreSQL**. 

Designed to demonstrate modern server-side rendering patterns, streaming UI, and serverless database architecture.

**🔗 Live Demo:** [https://nexus-five-virid.vercel.app/](https://nexus-five-virid.vercel.app/)

![Dashboard Preview](https://github.com/webbysrv/nextjs_admin_dashboard/blob/main/public/screenshots/desktop_preview.jpeg)

## ⚡ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database:** PostgreSQL (via [Neon](https://neon.tech/) Serverless)
- **ORM:** [Prisma 7](https://www.prisma.io/) (Latest version with Driver Adapters)
- **Analytics:** [Recharts](https://recharts.org/)
- **State Management:** URL-based State (Server-Side Pagination)

## ✨ Key Features

- **🛡️ Role-Based Users System:** Complete schema with Roles (Admin, Manager, User) and Status tracking.
- **📊 Real-time Analytics:** Interactive charts built with Recharts, rendering server-side data summaries.
- **⚡ Server-Side Pagination:** Zero client-side bloat. Pagination state is managed via URL search params.
- **🌑 Dark Mode:** Fully integrated theme switching with `next-themes`.
- **🚀 High Performance:** Uses `Promise.all` for parallel data fetching and React Server Components to minimize bundle size.
- **🌱 Database Seeding:** Includes a custom seed script using `@faker-js/faker` to generate 100+ realistic users.

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/webbysrv/nextjs_admin_dashboard.git](https://github.com/webbysrv/nextjs_admin_dashboard.git)
cd nextjs_admin_dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a .env file in the root directory and add your Neon PostgreSQL connection string:
```env
DATABASE_URL="postgres://user:password@host:port/db?sslmode=require"
```

### 4. Setup the Database (Prisma 7)
Push the schema to your database and generate the Prisma Client. Since we are using Prisma 7 Driver Adapters, this ensures the client is properly typed for serverless environments:
```bash
npx prisma db push
npx prisma generate
```

### 5. Seed Fake Data
Populate your database with 100+ realistic users to test pagination and charts:
```bash
npx prisma db seed
```

### 6. Run the Development Server
```bash
npm run dev
```

Open http://localhost:3000 to view your dashboard.

Built with ❤️ by [WebbySrv](https://webbysrv.com)
