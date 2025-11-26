<p align="center">
  <b>Student Management System</b> built with <a href="https://nestjs.com/" target="_blank">NestJS</a>.  
  A scalable backend including full CRUD operations, authentication, authorization, role management, and soft deletes.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" />
  <img src="https://img.shields.io/badge/NestJS-v10-red" />
  <img src="https://img.shields.io/badge/TypeORM-enabled-blue" />
  <img src="https://img.shields.io/badge/JWT-authentication-yellow" />
</p>

## 🚀 Description
A complete backend API for managing Students, teachers, users , profiles , courses , and enrollments.
Built using  **NestJS + TypeORM**, with:

- Full CRUD operations  
- JWT Authentication  
- Role-Based Access Control (RBAC)  
- Custom `AuthGuard` and `RolesGuard`  
- Password hashing using **bcrypt**  
- Soft Delete for user deactivation  
- Clean architecture (Controller → Service → DTO → Entity)

---

## 🛠 Technologies Used

- **NestJS**
- **Node.js**
- **TypeScript**
- **TypeORM**
- **JWT**
- **bcrypt (for password hashing)**
- **Class Validator & DTOs**
---

## ▶️ Run the Project

### Development mode (recommended)
```bash
npm run start:dev