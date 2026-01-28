# 🍼 BabyShop - Full-Stack E-Commerce Platform

A complete e-commerce solution for baby products with a modern client storefront, powerful admin dashboard, and robust backend API.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0-purple?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square&logo=mongodb)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)

---

## 🎯 Project Overview

BabyShop is a full-stack e-commerce platform specifically designed for baby products. It consists of three main parts:

| Part | Description | Port |
|------|-------------|------|
| **Client** | Customer-facing storefront | 3000 |
| **Admin** | Dashboard for managing products, orders, users | 5173 |
| **Server** | RESTful API backend | 5000 |

---

## 🛠 Tech Stack

### 🌐 Client (Customer Storefront)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router & Turbopack |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Zustand** | 5.0.10 | State management |
| **React Hook Form** | 7.71.1 | Form handling |
| **Zod** | 4.3.6 | Schema validation |
| **Framer Motion** | 12.29.0 | Animations |
| **Radix UI** | Latest | Accessible UI components |
| **Lucide React** | 0.539.0 | Icon library |
| **Stripe** | 20.2.0 | Payment processing |
| **Sonner** | 2.0.7 | Toast notifications |
| **next-themes** | 0.4.6 | Dark/Light mode |
| **js-cookie** | 3.0.5 | Cookie management |
| **use-debounce** | 10.1.0 | Debounce hooks |

### 🎛 Admin Dashboard

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI library |
| **Vite** | 7.0.4 | Build tool & dev server |
| **TypeScript** | 5.8.3 | Type safety |
| **Tailwind CSS** | 4.1.11 | Utility-first CSS framework |
| **React Router** | 7.13.0 | Client-side routing |
| **Axios** | 1.13.2 | HTTP client |
| **Zustand** | 5.0.10 | State management |
| **React Hook Form** | 7.71.1 | Form handling |
| **Zod** | 4.3.6 | Schema validation |
| **Recharts** | 3.7.0 | Charts & analytics |
| **Motion** | 12.29.0 | Animations |
| **Radix UI** | Latest | Accessible UI components |
| **Lucide React** | 0.539.0 | Icon library |
| **React Dropzone** | 14.3.8 | File uploads |
| **React to Print** | 3.2.0 | Invoice printing |
| **Sonner** | 2.0.7 | Toast notifications |
| **next-themes** | 0.4.6 | Dark/Light mode |

### ⚙️ Server (Backend API)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express** | 5.1.0 | Web framework |
| **MongoDB** | via Mongoose 8.17.1 | Database |
| **Mongoose** | 8.17.1 | ODM for MongoDB |
| **JWT** | 9.0.2 | Authentication |
| **bcryptjs** | 3.0.2 | Password hashing |
| **Cloudinary** | 2.7.0 | Image storage & CDN |
| **Multer** | 2.0.2 | File upload handling |
| **Stripe** | 18.4.0 | Payment processing |
| **Nodemailer** | 7.0.5 | Email sending |
| **Swagger** | 6.2.8 | API documentation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 17.2.1 | Environment variables |
| **express-async-handler** | 1.2.0 | Async error handling |
| **Nodemon** | 3.1.10 | Development auto-restart |

---

## ✨ Features

### 🛒 Client Features
- **Product Browsing** - Browse products by categories, brands, search
- **Product Details** - Detailed product pages with images
- **Shopping Cart** - Add/remove items, quantity management
- **Wishlist** - Save favorite products
- **User Authentication** - Register, login, profile management
- **Checkout** - Secure checkout with Stripe payment
- **Order Tracking** - View order history and status
- **Responsive Design** - Mobile-first responsive UI
- **Dark/Light Mode** - Theme switching
- **Search Functionality** - Search products with debounce

### 🎛 Admin Features
- **Dashboard** - Analytics with charts (Recharts)
- **Product Management** - CRUD operations for products
- **Category Management** - Create, edit, delete categories
- **Brand Management** - Manage product brands
- **Banner Management** - Homepage banner management
- **Order Management** - View and update order status
- **User Management** - View, edit, delete users
- **Invoice Management** - View and print invoices
- **Role-based Access** - Admin, User, Deliveryman roles

### ⚙️ Server Features
- **RESTful API** - Clean API architecture
- **JWT Authentication** - Secure token-based auth
- **Role-based Authorization** - Protected routes
- **Image Upload** - Cloudinary integration
- **Payment Processing** - Stripe integration
- **Email Notifications** - Order confirmation emails
- **API Documentation** - Swagger UI
- **Error Handling** - Centralized error handling

---

## 📁 Project Structure

```
babyshop-ecommerce/
├── client/                    # Next.js Customer Storefront
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── about/        # About page
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── help/         # Help Center
│   │   │   ├── privacy/      # Privacy Policy
│   │   │   ├── product/      # Product details
│   │   │   ├── returns/      # Returns & Refunds
│   │   │   ├── search/       # Search results
│   │   │   ├── shop/         # Shop page
│   │   │   ├── terms/        # Terms & Conditions
│   │   │   ├── success/      # Payment success page
│   │   │   ├── user/         # User pages
│   │   │   │   ├── cart/     # Shopping cart
│   │   │   │   ├── wishlist/ # Wishlist
│   │   │   │   ├── checkout/ # Checkout
│   │   │   │   ├── orders/   # Order history
│   │   │   │   └── profile/  # User profile
│   │   │   └── ...
│   │   ├── components/       # Reusable components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities, store, API
│   │   └── types/            # TypeScript types
│   └── package.json
│
├── admin/                     # Vite Admin Dashboard
│   ├── src/
│   │   ├── pages/            # Dashboard pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── Brands.tsx
│   │   │   ├── Banners.tsx
│   │   │   ├── Orders.tsx
│   │   │   ├── Users.tsx
│   │   │   ├── Invoices.tsx
│   │   │   └── Account.tsx
│   │   ├── components/       # UI components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities, API
│   │   └── store/            # Zustand store
│   └── package.json
│
├── server/                    # Express Backend API
│   ├── config/               # Database & app config
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Auth & error middleware
│   ├── models/               # Mongoose models
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── categoryModel.js
│   │   ├── brandModel.js
│   │   ├── bannerModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   ├── routes/               # API routes
│   ├── utils/                # Helper functions
│   ├── index.js              # Entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Stripe account
- Cloudinary account

### Clone the Repository
```bash
git clone https://github.com/yourusername/babyshop-ecommerce.git
cd babyshop-ecommerce
```

### Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install admin dependencies
cd ../admin
npm install

# Install client dependencies
cd ../client
npm install
```

---

## 🔐 Environment Variables

### Server (.env)
```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/babyshop

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# App
PORT=5000
NODE_ENV=development
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Development Mode

Open 3 terminal windows:

```bash
# Terminal 1 - Start Server
cd server
npm run dev

# Terminal 2 - Start Admin Dashboard
cd admin
npm run dev

# Terminal 3 - Start Client
cd client
npm run dev
```

### Access the Applications

| Application | URL |
|-------------|-----|
| Client Store | http://localhost:3000 |
| Admin Dashboard | http://localhost:5173 |
| API Server | http://localhost:5000 |
| API Docs (Swagger) | http://localhost:5000/api-docs |

### Production Build

```bash
# Build client
cd client
npm run build

# Build admin
cd ../admin
npm run build

# Start server in production
cd ../server
npm run start:production
```

---

## 📚 API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:5000/api-docs
```

### Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| **Products** | | |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| **Categories** | | |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category (Admin) |
| **Orders** | | |
| GET | `/api/orders` | Get user orders |
| GET | `/api/orders/admin` | Get all orders (Admin) |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id/status` | Update order status |
| **Users** | | |
| GET | `/api/users` | Get all users (Admin) |
| PUT | `/api/users/:id` | Update user (Admin) |
| DELETE | `/api/users/:id` | Delete user (Admin) |

---

## 👨‍💻 Author

**Shoriful Islam**

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Stripe](https://stripe.com/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/)
