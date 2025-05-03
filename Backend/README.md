
# Farmify Backend API

This is the backend API for the Farmify application, built with Express.js and MongoDB.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/farmify
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

3. Run the server:
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update user profile
- `PUT /api/auth/updatepassword` - Update password

### User Routes

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `PUT /api/users/:id/kyc` - Update user KYC status (Admin)

### Farmer Routes

- `GET /api/farmers` - Get all farmers (Public)
- `GET /api/farmers/:id` - Get single farmer (Public)
- `POST /api/farmers` - Create farmer profile (Private)
- `PUT /api/farmers/:id` - Update farmer profile (Private)
- `PUT /api/farmers/:id/application-status` - Update application status (Admin)

### Product Routes

- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `POST /api/products` - Create product (Farmer)
- `PUT /api/products/:id` - Update product (Farmer/Admin)
- `DELETE /api/products/:id` - Delete product (Farmer/Admin)

### Order Routes

- `GET /api/orders` - Get all orders (Private)
- `GET /api/orders/:id` - Get single order (Private)
- `POST /api/orders` - Create order (Consumer)
- `PUT /api/orders/:id/status` - Update order status (Admin/Farmer)

### Report Routes

- `GET /api/reports` - Get all reports (Admin)
- `GET /api/reports/:id` - Get single report (Admin)
- `POST /api/reports` - Create report (Private)
- `PUT /api/reports/:id` - Update report (Admin)
- `POST /api/reports/:id/comments` - Add comment to report (Admin)
- `PUT /api/reports/:id/resolve` - Resolve report (Admin)

### Payment Routes

- `GET /api/payments` - Get all payments (Private)
- `GET /api/payments/:id` - Get single payment (Private)
- `POST /api/payments/process-order` - Process order payment (Consumer)
- `POST /api/payments/payout` - Process payout (Admin)
- `POST /api/payments/request-payout` - Request payout (Farmer)
- `PUT /api/payments/:id/status` - Update payment status (Admin)

### Review Routes

- `GET /api/reviews` - Get all reviews (Public)
- `GET /api/reviews/:id` - Get single review (Public)
- `POST /api/reviews` - Create review (Consumer)
- `PUT /api/reviews/:id` - Update review (Consumer/Admin)
- `DELETE /api/reviews/:id` - Delete review (Consumer/Admin)
- `POST /api/reviews/:id/response` - Add farmer response to review (Farmer)

### Dashboard Routes

- `GET /api/dashboard/admin` - Get admin dashboard stats (Admin)
- `GET /api/dashboard/farmer` - Get farmer dashboard stats (Farmer)
- `GET /api/dashboard/consumer` - Get consumer dashboard stats (Consumer)

## MongoDB Models

- User
- Farmer
- Product
- Order
- Report
- Payment
- Review

## Middleware

- Authentication
- Authorization
- Error Handler
- File Upload

## Frontend Integration

Connect the frontend to this API by adding the base URL to your frontend environment:

```javascript
// In your frontend services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
```

Then use this API instance for all your frontend requests.
