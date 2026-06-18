# BuyBlink

BuyBlink is a full-stack dual-mode commerce platform built for both retail shoppers and wholesale buyers. The project combines a polished storefront, seller operations dashboard, customer account area, admin support workspace, and a real backend with Prisma-powered data models for products, orders, reviews, payments, notifications, and support flows.

## Why It Stands Out

- Dual retail and wholesale buying journeys inside one marketplace
- Distinct customer, seller, and admin experiences
- Premium storefront design instead of a plain CRUD demo
- Real backend architecture with PostgreSQL + Prisma
- Support tickets and live-style chat connected to orders
- Reviews, payment records, email/SMS logging, notifications, and audit logs

## Product Areas

### Customer

- Landing page with live product and review highlights
- Retail and wholesale catalog browsing
- Product detail pages with pricing modes and reviews
- Cart, checkout, payment, order history, wishlist, and account hub
- Support tickets and chat for order-linked issue resolution

### Seller

- Seller login and protected dashboard
- Product create, update, archive, and inventory tracking
- Order management with seller-side fulfilment status
- Customer and revenue views across catalog modes
- Store profile and settings management

### Admin

- Admin login route through seller auth flow
- Support desk for tickets, chats, replies, and queue management
- User moderation controls for account suspension/reactivation

## Tech Stack

### Frontend

- React 19
- Vite
- React Router 7
- Tailwind CSS
- Local cache helpers for smoother UX while syncing backend data

### Backend

- Node.js
- Express 5
- PostgreSQL
- Prisma ORM
- JWT authentication
- Zod validation
- Razorpay integration hooks
- SMTP and SMS provider configuration support

## Repo Structure

```text
BuyBlink/
  frontend/
    src/
      components/
      context/
      layout/
      lib/
      pages/
  backend/
    prisma/
    src/
      config/
      lib/
      middlewares/
      modules/
      routes/
      scripts/
      utils/
    tests/
  docs/
```

## Demo Credentials

Running the backend seed creates these accounts:

- Admin: `admin@buyblink.com` / `buyblink-admin`
- Seed seller: `platform@buyblink.com` / `buyblink-platform`

Customers can register from the UI.

## Getting Started

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The backend runs on `http://localhost:4000` by default.

## Environment Setup

At minimum, configure:

```env
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
```

Optional live integrations are supported for:

- Razorpay
- SMTP email
- Twilio SMS

See [backend/README.md](./backend/README.md) for backend-specific setup details.

## Verification Commands

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
npm test
npx prisma validate
```

## Current Highlights

- Production build succeeds
- Prisma schema validates cleanly
- Route-level lazy loading is enabled to improve bundle delivery
- Helper tests cover core formatting and support logic


