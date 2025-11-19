# 📚 Booking Classes API

A robust and scalable RESTful API for managing class bookings, businesses, instructors, and credit-based payment systems. Built with Node.js, Express.js, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.20.0-green)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## 📖 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Project Description

The **Booking Classes API** is a comprehensive backend solution designed for businesses offering class-based services (fitness studios, yoga centers, educational workshops, etc.). It enables:

- **User Management**: Customer and business account registration/authentication
- **Business Management**: CRUD operations for service providers
- **Class Sessions**: Schedule and manage classes with instructor assignments
- **Booking System**: Real-time class booking with capacity management
- **Credit System**: Prepaid credit packages and transaction tracking
- **Instructor Management**: Profile and availability management
- **Reviews & Analytics**: Rating system and business analytics
- **Notifications**: Event-driven notification system

### Key Backend Features

✅ **JWT-based Authentication** with role-based access control (RBAC)  
✅ **RESTful API Architecture** following industry best practices  
✅ **Rate Limiting & Security** using Helmet and Express Rate Limit  
✅ **MongoDB with Mongoose** for flexible document-based storage  
✅ **Error Handling** with centralized error management  
✅ **Idempotency Support** for safe payment operations  
✅ **Geolocation Support** for business location queries  
✅ **Scalable Architecture** with modular MVC pattern

---

## ⚡ Technologies Used

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| **Node.js**            | JavaScript runtime environment  |
| **Express.js 5.1.0**   | Web application framework       |
| **MongoDB**            | NoSQL database                  |
| **Mongoose 8.20.0**    | MongoDB ODM                     |
| **JWT (jsonwebtoken)** | Token-based authentication      |
| **bcryptjs**           | Password hashing                |
| **Helmet**             | Security middleware             |
| **Express Rate Limit** | API rate limiting               |
| **CORS**               | Cross-Origin Resource Sharing   |
| **Validator**          | Input validation                |
| **dotenv**             | Environment variable management |
| **Nodemon**            | Development auto-restart        |

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### Step-by-Step Installation

1. **Clone the repository**

```bash
git clone https://github.com/HossamAhmed954074/Booking-Classes-Api.git
cd Booking-Classes-Api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the required environment variables (see [Environment Variables](#-environment-variables) section).

4. **Verify MongoDB connection**

Ensure your MongoDB instance is running:

```bash
# For local MongoDB
sudo systemctl status mongod

# Or check MongoDB Atlas connection string
```

---

## 🚀 Running the Project

### Development Mode

Run the server with auto-restart on file changes:

```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

### Production Mode

For production deployment:

```bash
# Set NODE_ENV to production in .env
NODE_ENV=production node app.js
```

### Available NPM Scripts

```json
{
  "start": "nodemon app.js", // Development with auto-reload
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Verifying the Server

Once running, test the API:

```bash
curl http://localhost:3000/
# Response: "Hello World!"
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/booking-classes-db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/booking-classes-db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration (optional)
CORS_ORIGIN=*

# Application Settings
API_VERSION=v1
```

### Environment Variable Descriptions

| Variable                  | Description                 | Default       | Required |
| ------------------------- | --------------------------- | ------------- | -------- |
| `PORT`                    | Server port number          | `3000`        | No       |
| `NODE_ENV`                | Environment mode            | `development` | No       |
| `MONGODB_URI`             | MongoDB connection string   | -             | **Yes**  |
| `JWT_SECRET`              | Secret key for JWT signing  | -             | **Yes**  |
| `JWT_EXPIRES_IN`          | JWT token expiration time   | `7d`          | No       |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit time window (ms) | `900000`      | No       |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window     | `100`         | No       |

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User

**POST** `/api/v1/auth/register`

```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "role": "customer"  // or "business"
}

// Response (201 Created)
{
  "status": "success",
  "data": {
    "user": {
      "_id": "64abc123def456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer",
      "credits": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User

**POST** `/api/v1/auth/login`

```json
// Request Body
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Response (200 OK)
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64abc123def456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    }
  }
}
```

---

### Business Endpoints

#### Get All Businesses

**GET** `/api/v1/businesses`

```json
// Response (200 OK)
{
  "status": "success",
  "results": 15,
  "data": {
    "businesses": [
      {
        "_id": "64abc789def123",
        "name": "Fitness Studio Pro",
        "type": "Gym",
        "description": "Premium fitness center",
        "address": "123 Main St, New York",
        "rating": 4.5,
        "totalReviews": 120,
        "images": ["url1.jpg", "url2.jpg"]
      }
    ]
  }
}
```

#### Get Business by ID

**GET** `/api/v1/businesses/:id`

```json
// Response (200 OK)
{
  "status": "success",
  "data": {
    "business": {
      "_id": "64abc789def123",
      "userId": "64abc123def456",
      "name": "Fitness Studio Pro",
      "type": "Gym",
      "description": "Premium fitness center with state-of-the-art equipment",
      "address": "123 Main St, New York, NY 10001",
      "location": {
        "type": "Point",
        "coordinates": [-73.935242, 40.73061]
      },
      "rating": 4.5,
      "totalReviews": 120,
      "images": ["url1.jpg", "url2.jpg"],
      "amenities": ["Parking", "Showers", "WiFi"],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### Class Session Endpoints

#### Get All Class Sessions

**GET** `/api/v1/class-sessions`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

---

### Booking Endpoints

#### Create Booking

**POST** `/api/v1/bookings`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

```json
// Request Body
{
  "classSessionId": "64xyz789abc123",
  "creditsUsed": 10
}

// Response (201 Created)
{
  "status": "success",
  "data": {
    "booking": {
      "_id": "64booking123",
      "userId": "64abc123def456",
      "classSessionId": "64xyz789abc123",
      "status": "confirmed",
      "creditsUsed": 10,
      "bookedAt": "2024-11-19T14:30:00.000Z"
    }
  }
}
```

---

### Credit Endpoints

#### Get User Credits

**GET** `/api/v1/credits/balance`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

```json
// Response (200 OK)
{
  "status": "success",
  "data": {
    "balance": 50,
    "userId": "64abc123def456"
  }
}
```

---

### Instructor Endpoints

**GET** `/api/v1/instructors` - Get all instructors  
**GET** `/api/v1/instructors/:id` - Get instructor by ID

---

### Error Responses

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Detailed error message"
}
```

**Common HTTP Status Codes:**

| Code  | Description                             |
| ----- | --------------------------------------- |
| `200` | OK - Request successful                 |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input data        |
| `401` | Unauthorized - Missing or invalid token |
| `403` | Forbidden - Insufficient permissions    |
| `404` | Not Found - Resource doesn't exist      |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error                   |

---

## 📁 Project Structure

```
BookingClasses-api/
├── app.js                          # Application entry point
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables (not in repo)
├── .gitignore                      # Git ignore rules
│
├── controllers/                    # Request handlers
│   ├── authController.js           # Authentication logic
│   ├── bookingsController.js       # Booking management
│   ├── businessController.js       # Business CRUD operations
│   ├── classSessionController.js   # Class session management
│   ├── creditsController.js        # Credit system logic
│   └── instructorsController.js    # Instructor management
│
├── models/                         # Mongoose schemas
│   ├── userModel.js                # User schema (customer/business)
│   ├── businessModel.js            # Business schema
│   ├── classSession.js             # Class session schema
│   ├── bookingModel.js             # Booking schema
│   ├── instructorModel.js          # Instructor schema
│   ├── creditPackage.js            # Credit package schema
│   ├── creditTransactionModel.js   # Credit transaction log
│   ├── notificationModel.js        # Notification schema
│   ├── reviewsModel.js             # Review and rating schema
│   └── analyticsModel.js           # Analytics data schema
│
├── routers/                        # Route definitions
│   ├── auth.js                     # Auth routes (/register, /login)
│   ├── businessRoutes.js           # Business routes
│   ├── classSessionRouters.js      # Class session routes
│   ├── bookingsRouters.js          # Booking routes
│   ├── creditsRoutes.js            # Credit management routes
│   └── instructorsRoutes.js        # Instructor routes
│
├── middleware/                     # Custom middleware
│   ├── authMW.js                   # JWT verification & RBAC
│   ├── asyncWrapper.js             # Async error handler wrapper
│   └── appLimiterMW.js             # Rate limiting middleware
│
├── data/                           # Database configuration
│   └── db.js                       # MongoDB connection setup
│
├── errors/                         # Error handling
│   └── appError.js                 # Custom error class
│
└── utils/                          # Utility functions
    ├── httpStatusConstant.js       # HTTP status code constants
    └── idempotency.js              # Idempotency key handler
```

### Architecture Explanation

- **MVC Pattern**: Model-View-Controller separation for clean architecture
- **Modular Routing**: Each resource has its own router file
- **Middleware Layer**: Centralized authentication, validation, and rate limiting
- **Error Handling**: Global error handler with custom error classes
- **Database Abstraction**: Mongoose models for schema validation
- **Utility Functions**: Reusable helpers for common operations

---

## 🗄️ Database Schema Overview

### Collections

#### **Users Collection**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['customer', 'business']),
  phone: String (unique),
  avatarUrl: String,
  credits: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

#### **Businesses Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  name: String,
  type: String,
  description: String,
  address: String,
  location: {
    type: String (default: 'Point'),
    coordinates: [Number, Number] // [longitude, latitude]
  },
  rating: Number (0-5),
  totalReviews: Number,
  images: [String],
  amenities: [String],
  operatingHours: Object,
  createdAt: Date,
  updatedAt: Date
}
```

#### **Class Sessions Collection**

```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: 'Business'),
  instructorId: ObjectId (ref: 'Instructor'),
  name: String,
  description: String,
  startTime: Date,
  endTime: Date,
  capacity: Number,
  bookedCount: Number,
  creditsRequired: Number,
  status: String (enum: ['scheduled', 'ongoing', 'completed', 'cancelled']),
  createdAt: Date
}
```

#### **Bookings Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  classSessionId: ObjectId (ref: 'ClassSession'),
  businessId: ObjectId (ref: 'Business'),
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed']),
  creditsUsed: Number,
  bookedAt: Date,
  cancelledAt: Date,
  completedAt: Date
}
```

#### **Instructors Collection**

```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: 'Business'),
  name: String,
  email: String,
  phone: String,
  specialization: [String],
  bio: String,
  avatarUrl: String,
  rating: Number,
  totalClasses: Number,
  createdAt: Date
}
```

#### **Credit Packages Collection**

```javascript
{
  _id: ObjectId,
  name: String,
  credits: Number,
  price: Number,
  description: String,
  validityDays: Number,
  isActive: Boolean
}
```

#### **Credit Transactions Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  amount: Number,
  type: String (enum: ['purchase', 'debit', 'refund']),
  description: String,
  balanceAfter: Number,
  createdAt: Date
}
```

#### **Reviews Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  businessId: ObjectId (ref: 'Business'),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

#### **Notifications Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  type: String,
  title: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

#### **Analytics Collection**

```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: 'Business'),
  date: Date,
  totalBookings: Number,
  totalRevenue: Number,
  totalClasses: Number,
  cancellationRate: Number,
  averageClassOccupancy: Number
}
```

---

## 🔒 Authentication & Authorization

### JWT (JSON Web Token) Authentication

This API uses **JWT-based authentication** for secure, stateless session management.

#### How It Works

1. **User Registration/Login**: User provides credentials
2. **Token Generation**: Server creates a JWT containing user data
3. **Token Storage**: Client stores token (localStorage/sessionStorage)
4. **Authenticated Requests**: Client sends token in Authorization header
5. **Token Verification**: Server validates token on each request

#### JWT Token Structure

```javascript
// Token Payload
{
  id: "user_id",
  email: "user@example.com",
  name: "User Name",
  role: "customer" | "business",
  avatarUrl: "url",
  iat: 1700000000,  // Issued at
  exp: 1700604800   // Expires at (7 days default)
}
```

#### Making Authenticated Requests

Include the JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
     http://localhost:3000/api/v1/bookings
```

### Role-Based Access Control (RBAC)

The API implements RBAC with two primary roles:

| Role         | Permissions                                                              |
| ------------ | ------------------------------------------------------------------------ |
| **customer** | Book classes, manage own bookings, purchase credits, write reviews       |
| **business** | Create/manage classes, view analytics, manage instructors, view bookings |

#### Implementation Example

```javascript
// Protecting routes with authentication
router.post("/bookings", auth, bookingController.create);

// Protecting routes with role-based access
router.post("/classes", auth, requireRole("business"), classController.create);
```

### Security Best Practices Implemented

✅ **Password Hashing**: bcryptjs with salt rounds  
✅ **JWT Expiration**: Tokens expire after 7 days  
✅ **HTTP Headers Security**: Helmet middleware  
✅ **Rate Limiting**: Prevents brute-force attacks  
✅ **CORS Configuration**: Controlled cross-origin requests  
✅ **Input Validation**: Validator library for email/phone  
✅ **Error Message Sanitization**: No sensitive data in errors

---

## 🧪 Testing

### Running Tests

Currently, the test suite is under development. To run tests:

```bash
npm test
```

### Manual API Testing

Use tools like **Postman**, **Insomnia**, or **cURL** for manual testing:

#### Using Postman

1. Import the API collection (create from endpoints above)
2. Set up environment variables (BASE_URL, TOKEN)
3. Test authentication flow first
4. Use the returned token for protected routes

#### Using cURL

```bash
# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!","phone":"+1234567890"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get businesses (authenticated)
curl -X GET http://localhost:3000/api/v1/businesses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Coverage Goals

- [ ] Unit tests for controllers
- [ ] Integration tests for API endpoints
- [ ] Database mock tests
- [ ] Authentication middleware tests
- [ ] Error handling tests

---

## 🚢 Deployment

### Docker Deployment

#### 1. Create Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

#### 2. Create docker-compose.yml

```yaml
version: "3.8"

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/booking-classes-db
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=7d
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

#### 3. Build and Run

```bash
# Build Docker image
docker build -t booking-classes-api .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f api
```

---

### Cloud Deployment Options

#### Option 1: Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create new app
heroku create booking-classes-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_atlas_uri

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Option 2: AWS EC2

1. **Launch EC2 instance** (Ubuntu 22.04)
2. **Install Node.js and MongoDB**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Clone repository** and install dependencies
4. **Use PM2** for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start app.js --name booking-api
   pm2 startup
   pm2 save
   ```
5. **Configure Nginx** as reverse proxy

#### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy with one click

#### Option 4: Render

1. Connect GitHub repository
2. Select Node.js environment
3. Configure build and start commands
4. Add environment variables
5. Deploy automatically

---

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Configure MongoDB Atlas with IP whitelist
- [ ] Enable MongoDB authentication
- [ ] Set up SSL/TLS certificates (Let's Encrypt)
- [ ] Configure proper CORS origins
- [ ] Set up application monitoring (New Relic, Datadog)
- [ ] Configure logging (Winston, Morgan)
- [ ] Set up automated backups for MongoDB
- [ ] Implement CI/CD pipeline (GitHub Actions)
- [ ] Configure rate limiting for production traffic
- [ ] Set up health check endpoints
- [ ] Use environment-specific configuration files

---

## 🤝 Contributing

We welcome contributions to the Booking Classes API! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository**

   ```bash
   git clone https://github.com/HossamAhmed954074/Booking-Classes-Api.git
   cd Booking-Classes-Api
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm test
   ```

5. **Commit with conventional commits**

   ```bash
   git commit -m "feat: add new booking validation"
   git commit -m "fix: resolve credit deduction issue"
   git commit -m "docs: update API documentation"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure CI/CD checks pass

### Code Style

- Use **ES6+** syntax
- Follow **camelCase** for variables and functions
- Use **PascalCase** for models and classes
- Add **JSDoc comments** for functions
- Keep functions small and focused (single responsibility)
- Use **async/await** over callbacks

### Reporting Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/HossamAhmed954074/Booking-Classes-Api/issues) with:

- Clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details (Node version, OS)

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024, Booking Classes API

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 📧 Contact

### Project Maintainer

**Hossam Ahmed**

- 🔗 GitHub: [@HossamAhmed954074](https://github.com/HossamAhmed954074)
- 📧 Email: [eltohamehossam@gmail.com](mailto:your.email@example.com)
- 💼 LinkedIn: [https://www.linkedin.com/in/hossam-ahmed-ab4987248/](https://linkedin.com/in/yourprofile)

### Support

- 📖 **Documentation**: [Wiki](https://github.com/HossamAhmed954074/Booking-Classes-Api/wiki)
- 🐛 **Bug Reports**: [Issues](https://github.com/HossamAhmed954074/Booking-Classes-Api/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/HossamAhmed954074/Booking-Classes-Api/discussions)

---

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **Mongoose** for elegant MongoDB object modeling
- **MongoDB** for the powerful NoSQL database
- All contributors who help improve this project

---

## 📊 Project Status

![GitHub issues](https://img.shields.io/github/issues/HossamAhmed954074/Booking-Classes-Api)
![GitHub pull requests](https://img.shields.io/github/issues-pr/HossamAhmed954074/Booking-Classes-Api)
![GitHub last commit](https://img.shields.io/github/last-commit/HossamAhmed954074/Booking-Classes-Api)

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** November 19, 2025

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/HossamAhmed954074">Hossam Ahmed</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
