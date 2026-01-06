# MERN E-commerce Application

Env Credential
MONGO_URI=mongodb+srv://rakesh:MyPass123@cluster0.bt3rm.mongodb.net/myDatabase?retryWrites=true&w=majority
STRIPE_WEBHOOK_SECRET=whsec_c30f187002723867aa286cfffd73f6dc92a6a9f3481783be1d50409667747482
MONGO_URI=mongodb+srv://rakesh:MyPass123@cluster0.bt3rm.mongodb.net/myDatabase?retryWrites=true&w=majority

STRIPE_SECRET_KEY  =  "sk_test_51SmSYL0YEGm67r4eFTUHgY7NZiNSBcVrs663dnobMEo28j0VOnjgm8BdicLvuTkJKnjrhqqdycdewxXoTIbPqe8M00FdQ3D5ut"

PORT= 8000

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Stripe payment integration.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Stripe Integration](#stripe-integration)
- [License](#license)

## Project Overview

This application allows users to:

- Browse products and add them to the cart
- View cart items and proceed to checkout
- Make payments securely using Stripe
- Receive confirmation of successful or failed payments
- Backend tracks all orders and payment statuses in MongoDB

## Features

### Frontend

- Product listing with "Add to Cart" functionality
- Cart icon displaying number of items
- Checkout page with email input (mandatory) and payment fields
- Payment status pages (Success / Failure / Cancel)

### Backend

- Order tracking in MongoDB
- Store order details including purchased items, payment status, Stripe transaction ID, and customer email
- Stripe webhook to update payment status automatically

## Folder Structure

```
backend/
├── controller/
│   └── product.js
├── model/
│   ├── orderModel.js
│   ├── payment.js
│   └── productModal.js
├── routes/
│   ├── productRoute.js
│   └── stripeRoute.js
├── index.js
├── package.json
├── .env
└── seedProducts.js

frontend/
├── public/
├── src/
│   ├── Admin/
│   ├── assets/
│   ├── component/
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   └── pages/
│       ├── CancelPage.jsx
│       ├── Cart.jsx
│       ├── Checkout.jsx
│       └── Home.jsx
├── package.json
└── vite.config.js
```

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=5000
```

## Usage

### Start Backend

```bash
cd backend
nodemon index.js
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173` (Vite default port).

## Technologies Used

- **Frontend:** React, Redux, React Router, Bootstrap, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Payments:** Stripe (Payment Intent API & Webhooks)
- **Others:** dotenv, cors, body-parser, uuid

## Stripe Integration

- Users are redirected to Stripe checkout page for secure payments
- After payment:
  - **Success:** "Thank You" page and order saved in MongoDB
  - **Failure:** Payment failure page and order status updated in MongoDB
- Stripe webhooks are used to update payment status in real-time

### Webhook Setup

To configure Stripe webhooks for local development:

```bash
stripe listen --forward-to localhost:5000/webhook
```

For production, configure the webhook URL in your Stripe Dashboard.

## License

This project is open-source and available under the MIT License.#



