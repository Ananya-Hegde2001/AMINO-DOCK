# AMINO DOCK - Full Stack Premium Supplement Platform

Modern red-white premium fitness web platform with customizable stacks, AI recommendations, authenticity checks, cart/checkout, and admin management.

## Tech Stack

- Frontend: Next.js, React, TailwindCSS, Framer Motion
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Security: JWT authentication with role-based admin APIs

## Project Structure

```
/frontend
  /components
  /context
  /pages
  /styles
  /utils
  package.json

/backend
  /config
  /controllers
  /middleware
  /models
  /routes
  /utils
  server.js
  package.json
```

## Database Schema

### User
- name: String
- email: String (unique)
- password: String (hashed)
- role: customer | admin

### Product
- name, slug (unique), description, category
- flavours: String[]
- sizes: String[]
- capsules: Number
- price: Number
- inStock: Boolean
- tags: String[]

### Order
- user: ObjectId(User)
- items: product reference, name, flavour, size, qty, price
- customStack: baseProduct, flavour, sweetener, extras[]
- total, status
- shippingAddress

### Review
- user: ObjectId(User)
- product: ObjectId(Product)
- rating: 1..5
- comment
- approved

### Verification
- productCode, qrCode, nfcTag (all unique)
- productName, batchNo
- manufacturedAt, expiresAt
- isAuthentic
- scans[] with method and timestamp

## Core Pages

- Home
- Products
- Custom Stack Builder
- Combo Deals
- Authenticity Check
- About Brand
- Contact
- Cart + Checkout
- Login / Register
- Admin Panel

## Key APIs

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Products
- GET /api/products
- GET /api/products/:slug
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)
- POST /api/products/seed/catalog (admin)

### Orders
- POST /api/orders
- GET /api/orders/mine
- GET /api/orders (admin)
- PUT /api/orders/:id/status (admin)

### AI Stack Recommendation
- POST /api/ai/recommend-stack

### Authenticity Verification
- POST /api/verify/qr
- POST /api/verify/nfc
- POST /api/verify/tags (admin)

### Reviews
- GET /api/reviews/:productId
- POST /api/reviews

## Setup

1. Backend setup
- cd backend
- npm install
- copy .env.example to .env and configure values
- npm run dev

2. Frontend setup
- cd frontend
- npm install
- copy .env.local.example to .env.local
- npm run dev

The frontend runs on port 3000 and backend on port 5000 by default.
