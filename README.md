#  Party Menu - Full Stack Recipe Management System

A modern **Full Stack Party Menu web application** built with **React, Node.js, Express, MongoDB, and JWT Authentication**. The application allows users to create an account, securely log in, browse party recipes, search and filter dishes, view detailed recipe information, and save favorite recipes locally for quick access.

---

#  Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using Local Storage
* Secure Password Hashing with bcrypt

---

##  Recipe Management

* Browse all party recipes
* View recipe details
* Recipe image gallery
* Ingredients list
* Serving information
* Category-wise recipes

---

##  Search & Filters

* Search recipes by name
* Filter by category

  * Starter
  * Main Course
  * Sides
  * Dessert
* Filter by

  * Veg
  * Non-Veg

---

##  Saved Recipes

* Save favourite recipes
* Remove saved recipes
* Persistent using Local Storage

---

##  Responsive Design

* Mobile Friendly
* Tablet Friendly
* Desktop Friendly

Built completely using **Tailwind CSS**.

---

#  Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Context API
* Fetch API
* Vite
---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* CORS
* Morgan
* dotenv

---

#  Project Structure

```text
Party-Menu/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── README.md
```

---

#  Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/party-menu.git
```

```bash
cd party-menu
```

---

## 2. Install Frontend

```bash
cd client
```

```bash
npm install
```

---

## 3. Install Backend

```bash
cd ../server
```

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Seed Database

```bash
npm run seed
```

---

# Run Backend

```bash
npm run dev
```

Runs on

```
http://localhost:5000
```

---

# Run Frontend

```bash
cd client
```

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Authentication API

## Register

```
POST /api/auth/register
```

### Request

```json
{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"password123"
}
```

---

## Login

```
POST /api/auth/login
```

### Request

```json
{
  "email":"john@example.com",
  "password":"password123"
}
```

---

## Current User

```
GET /api/auth/me
```

Authorization Header

```
Bearer <token>
```

---

# Recipe API

## Get All Recipes

```
GET /api/menu
```

---

## Get Recipe by ID

```
GET /api/menu/:id
```

---

# User Flow

```
User
   │
   ▼
Register
   │
   ▼
Login
   │
   ▼
JWT Token Generated
   │
   ▼
Browse Recipes
   │
   ├─────────────► Search
   │
   ├─────────────► Filter
   │
   ├─────────────► View Details
   │
   └─────────────► Save Favourite Recipes
```

---

# Security Features

* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt
* Secure API Authorization
* Environment Variables
* Input Validation

---

# Key Features

* Full Stack MERN Architecture
* JWT Based Authentication
* MongoDB Database
* Responsive UI
* Category Filtering
* Recipe Search
* Recipe Details
* Saved Recipes
* Modern React Hooks
* Context API State Management
* RESTful APIs

---

# Future Enhancements

* Admin Dashboard
* Recipe CRUD Operations
* Image Upload using Cloudinary
* Favorite Recipes in Database
* User Profile
* Ratings & Reviews
* Recipe Recommendations
* Email Verification

---



# Author

**Bhuvan K**


---

# License

This project is licensed under the **MIT License**.

---

##  If you found this project useful, consider giving it a star on GitHub!
