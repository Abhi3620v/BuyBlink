# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

BuyBlink – Retail & Wholesale E-Commerce Platform
Project Overview

BuyBlink is a modern dual-mode e-commerce platform that allows users to purchase products either individually (Retail) or in bulk (Wholesale). The platform also includes a Seller Dashboard where sellers can manage their products using a complete CRUD system.

The project demonstrates the complete frontend architecture of an e-commerce marketplace, including product browsing, cart management, checkout, payment selection, and order history.

Currently the application uses LocalStorage for data persistence, but the architecture is designed so it can easily be connected to a backend API and database.

Key Features
Authentication System

Seller registration

Seller login

Protected dashboard access

Session persistence using LocalStorage

Seller Dashboard

Sellers can manage their store through a dashboard interface.

Features include:

Add Product

Edit Product

Delete Product

Product listing table

Image preview

Search products

Product Marketplace

Users can browse products through a clean product grid.

Each product card includes:

Product image

Product description

Retail price

Wholesale price

Minimum wholesale quantity

Rating display

Discount badge

Wishlist toggle

Quick action buttons

Retail & Wholesale Modes

BuyBlink supports two purchasing modes:

Retail Mode

Users buy single products

Standard retail price

Wholesale Mode

Users buy bulk quantities

Discounted wholesale pricing

Minimum quantity requirement

Cart System

Users can manage products inside the cart.

Features include:

Add to cart

Remove item

Update quantity

Persistent cart storage

Order summary calculation

Checkout System

The checkout process includes multiple steps:

Cart Page

Shipping Details Form

Payment Method Selection

Order Confirmation

Payment Page

Users can select a payment method such as:

UPI

Debit / Credit Card

Cash on Delivery

Currently this is a mock payment UI, but it is designed so it can easily integrate with real payment gateways such as:

Razorpay

Stripe

Order Success Page

After payment confirmation the user sees an order success message and can continue shopping.

Order History Page

Users can view their previous orders including:

Order ID

Payment Method

Date

Total Amount

Orders are stored in LocalStorage for simulation.
