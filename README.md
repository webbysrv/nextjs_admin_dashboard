# 🚀 Admin Dashboard

A high-performance, full-stack admin dashboard built with **Next.js 15 (App Router)**, **Prisma 7**, and **PostgreSQL**. 

Designed to demonstrate modern server-side rendering patterns, streaming UI, and serverless database architecture.

![Dashboard Preview](https://via.placeholder.com/1200x600.png?text=Add+Your+Screenshot+Here)
*(Replace this link with a real screenshot of your dashboard after deploying)*

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
git clone [https://github.com/webbysrv/admin_dashboard.git](https://github.com/webbysrv/admin_dashboard.git)
cd admin_dashboard
```     