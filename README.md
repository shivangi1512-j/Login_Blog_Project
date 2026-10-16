# Login System with Blog REST API

A RESTful backend API built with **Node.js, Express.js, MongoDB, and Mongoose** for user authentication and blog management.

The application implements **User Registration, Login, JWT Authentication, Protected Routes, Logout, and complete Blog CRUD operations** while following a clean MVC-style architecture.

---

## Overview

The Login System with Blog REST API allows users to register, log in securely, and manage their blog records through RESTful API endpoints.

### Main Operations

- Register a new user
- Log in with email and password
- Authenticate users using JWT
- Access protected routes
- Get the authenticated user's profile
- Log out and revoke the current token
- Create a new blog
- Get all blogs
- Get a blog by ID
- Update blog details
- Delete a blog

User information, blog records, and revoked tokens are stored in **MongoDB** and managed using **Mongoose**.

---

## Features

- RESTful API architecture
- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Password Hashing using bcryptjs
- Password and Request Validation
- User Profile Management
- Logout and Token Revocation
- Complete Blog CRUD Operations
- Blog Ownership Authorization
- MongoDB Integration
- Mongoose Schema and Validation
- MVC-style Architecture
- Centralized Error Handling Middleware
- Request Validation Middleware
- Environment Variable Configuration
- JSON Request and Response Handling
- Postman API Testing

---

## Tech Stack

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | JavaScript runtime            |
| Express.js | Backend framework             |
| MongoDB    | Database                      |
| Mongoose   | MongoDB ODM                   |
| JWT        | User authentication           |
| bcryptjs   | Password hashing              |
| Dotenv     | Environment variables         |
| CORS       | Cross-Origin Resource Sharing |
| Postman    | API testing                   |

---

## Project Structure

```text
Login_Blog_Project/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── blogModel.js
│   │   ├── tokenModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   │
│   └── utils/
│       └── generateToken.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Log in an existing user        |
| GET    | `/api/auth/me`       | Get the user profile           |
| POST   | `/api/auth/logout`   | Log out the authenticated user |

### Blog Routes

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/blogs`     | Create a new blog |
| GET    | `/api/blogs`     | Get all blogs     |
| GET    | `/api/blogs/:id` | Get a blog by ID  |
| PUT    | `/api/blogs/:id` | Update a blog     |
| DELETE | `/api/blogs/:id` | Delete a blog     |

All blog routes require valid JWT authentication. Users can update and delete only their own blog records.

---

## Project Explanation Video

**Explanation Video**

**Link:** [Add your Google Drive video link here]

---

**Thank you.**
