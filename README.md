# 🔷 Role-Based Task Management System (Full Stack)

A production-style full-stack task management system with secure authentication, role-based access control (Admin/User), admin dashboard, and complete API documentation using Swagger.

This project demonstrates scalable backend architecture, clean frontend integration, and real-world RBAC implementation suitable for production-level systems.

---

# 🌐 Live Demo

**Frontend (Vercel):** https://backend-assignment-prashant.vercel.app
**Backend API (Render/Railway):** https://backend-assignment-def8.onrender.com
**Swagger Docs:** https://backend-assignment-def8.onrender.com/api-docs


You can directly test all APIs from Swagger or use the live UI.

---

# 🧠 Project Overview

This system allows users to manage personal tasks while providing an admin panel to manage users and assign tasks globally. It follows a modular backend architecture and demonstrates secure authentication, role-based authorization, and scalable API design.

The goal of this project is to demonstrate strong backend fundamentals, API design, and full-stack integration suitable for real-world applications.

---

# 🚀 Tech Stack

## Backend

* Node.js + Express + TypeScript
* PostgreSQL database
* Prisma ORM
* JWT authentication
* Role-Based Access Control (RBAC)
* Zod validation
* Swagger API documentation
* Modular architecture (Auth, Tasks, Admin)

## Frontend

* Next.js (App Router) + TypeScript
* Tailwind CSS
* Secure API integration with JWT
* Admin & User dashboards
* Protected routes & role-based UI

---

# ✨ Core Features

## 🔐 Authentication

* Secure user registration & login
* Password hashing
* JWT-based authentication
* Protected routes using middleware

## 👤 User Features

* Create tasks
* View personal tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Clean dashboard UI

## 👑 Admin Features

* View all users
* Change user roles (USER ↔ ADMIN)
* Delete users
* View all tasks from all users
* Assign tasks to any user
* Update/delete any task
* Admin dashboard panel

## 📘 API Documentation

* Full Swagger documentation available
* All endpoints testable from browser
* JWT authorization supported inside Swagger

---

# 🏗️ System Architecture

The backend follows a modular and scalable architecture:

```
backend/
 ├── modules/
 │   ├── auth/
 │   ├── tasks/
 │   └── admin/
 ├── middleware/
 ├── config/
 └── utils/
```

Each module handles its own:

* routes
* controllers
* services
* validation

JWT-based stateless authentication allows horizontal scaling and easy integration with microservices or load balancers.

---

# 🔑 Demo Credentials

### Admin Access

Email: admin@test.com
Password: 123456

### User Access

Email: user@test.com
Password: 123456

You can also register new users directly.

---

# 🔌 API Endpoints

## Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

## User Task Routes

```
GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

## Admin Routes

```
GET    /api/v1/admin/users
DELETE /api/v1/admin/users/:id
PATCH  /api/v1/admin/users/:id/role
GET    /api/v1/admin/tasks
POST   /api/v1/admin/assign-task
PUT    /api/v1/admin/tasks/:taskId
DELETE /api/v1/admin/tasks/:taskId
```

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📘 Swagger Documentation

Open Swagger UI:

```
 https://backend-assignment-def8.onrender.com/api-docs
```

From here you can:

* Login
* Copy JWT token
* Authorize
* Test all protected routes

---

# ⚙️ Run Locally

## Backend Setup

```
git clone "https://github.com/prashantttzz/backend-assignment.git"
cd backend
npm install
```

Create `.env`:

```
DATABASE_URL="postgresql://neondb_owner:npg_Gs9pmjznX4vC@ep-silent-base-aijr9m7k-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET=supersecret123
PORT=5000
```

Run migrations:

```
npx prisma migrate dev
```

Start server:

```
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

# 📈 Scalability & Design Notes

This project is designed with scalability in mind:

* Modular backend architecture
* Stateless JWT authentication
* Clear separation of concerns
* Prisma ORM for database scalability
* Can be extended with Redis caching
* Suitable for microservices architecture
* Ready for Docker & cloud deployment

---

# 🎯 Assignment Coverage

This project fulfills all assignment requirements:

✔ Secure REST API
✔ Authentication & authorization
✔ Role-based access control
✔ CRUD operations
✔ Admin management APIs
✔ Basic frontend UI
✔ Swagger documentation
✔ Scalable architecture

---

# 👨‍💻 Author

Prashant
Backend Developer Assignment Submission
