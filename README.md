# 📚 Booking Classes API

A robust and scalable RESTful API for managing class bookings, businesses, instructors, and credit-based payment systems. Built with Node.js, Express.js, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.20.0-green)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Advanced Features](#-advanced-features)
- [Testing with Postman](#-testing-with-postman)

---

## 🎯 Project Overview

The **Booking Classes API** is a comprehensive backend solution designed for businesses offering class-based services such as fitness studios, yoga centers, educational workshops, and similar establishments. This API provides a complete booking management system with integrated payment handling through a credit-based system.

### Use Cases

- 🏋️ **Fitness Studios**: Manage gym classes, personal training sessions
- 🧘 **Yoga Centers**: Schedule and book yoga classes
- 📚 **Educational Workshops**: Book training sessions and courses
- 🎨 **Creative Studios**: Manage art classes, music lessons
- 💼 **Any Service Business**: Offering scheduled class-based services

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication** with secure token generation
- **Role-Based Access Control (RBAC)** supporting `customer` and `business` roles
- **Password Security** using bcryptjs hashing with salt rounds
- **Token Validation** middleware for protected routes
- **Email, Phone & Password Validation** using the validator library

### 👥 User Management

- User registration with role selection (customer/business)
- Secure login with JWT token generation
- User profile with avatars and contact information
- Credit balance tracking per user
- Get current authenticated user details

### 🏢 Business Management

- Business profile creation and management
- **Geolocation Support** with 2dsphere indexing for location-based searches
- Business search with filters (type, location, radius)
- Rating and review system integration
- Business amenities and images management
- Contact information (email, phone)
- Active/inactive status control

### 📅 Class Session Management

- Create and manage class sessions
- Schedule classes with instructor assignment
- Capacity management with booked spots tracking
- Date range filtering for class searches
- Class levels (beginner, intermediate, advanced)
- Session status tracking (scheduled, cancelled, completed)
- Recurring class pattern support
- Credit requirement per class

### 📝 Booking System

- **Transaction-Safe Booking** using MongoDB transactions
- Real-time capacity checking
- Credit verification before booking
- **Idempotency Support** to prevent duplicate bookings
- Unique booking constraint (user + session)
- Booking status management (pending, confirmed, cancelled, declined)
- Business owner notifications for new bookings
- Automatic credit deduction and transaction logging
- Booking history and filtering by status
- Role-based booking management (customers create, businesses confirm/cancel)

### 💳 Credit System

- Credit package management with pricing
- Mock credit purchase flow (ready for payment gateway integration)
- **Automatic Credit Transaction Logging**
- Credit balance tracking
- Transaction types: purchase, usage, refund, adjustment
- Credit package popularity and discount support
- Validity period for purchased credits

### 👨‍🏫 Instructor Management

- Instructor profile creation
- Specialties and certifications tracking
- Instructor ratings and total classes count
- Bio and photo management
- Business association
- Active/inactive status

### 🔔 Notification System

- Event-driven notifications
- Notification types for various events
- Read/unread status tracking
- Related entity linking (bookings, classes, etc.)
- Action URL support for deep linking

### ⭐ Reviews & Ratings

- Business and session reviews
- Star ratings (1-5)
- Verified review system
- Business response capability
- Automatic rating aggregation

### 📊 Analytics & Reporting

- Business analytics tracking
- Metrics collection
- Date and period-based analytics
- Performance monitoring

### 🛡️ Security Features

- **Helmet.js** for HTTP header security
- **Rate Limiting** to prevent abuse and DDoS attacks
- **CORS** configuration for cross-origin requests
- Input validation and sanitization
- Error message sanitization (no sensitive data exposure)
- Environment variable protection

### 🚀 Performance & Reliability

- **Async/Await** error handling wrapper
- MongoDB indexing for optimized queries
- Geospatial queries with 2dsphere indexing
- Pagination support for all list endpoints
- Modular MVC architecture
- Centralized error handling

---

## ⚡ Technologies Used

| Technology             | Version  | Purpose                         |
| ---------------------- | -------- | ------------------------------- |
| **Node.js**            | v18+     | JavaScript runtime environment  |
| **Express.js**         | 5.1.0    | Web application framework       |
| **MongoDB**            | Latest   | NoSQL database                  |
| **Mongoose**           | 8.20.0   | MongoDB ODM                     |
| **jsonwebtoken**       | 9.0.2    | JWT authentication              |
| **bcryptjs**           | 3.0.3    | Password hashing                |
| **Helmet**             | 8.1.0    | Security middleware             |
| **express-rate-limit** | 8.2.1    | API rate limiting               |
| **CORS**               | 2.8.5    | Cross-Origin Resource Sharing   |
| **Validator**          | 13.15.23 | Input validation                |
| **dotenv**             | 17.2.3   | Environment variable management |
| **Nodemon**            | 3.1.11   | Development auto-restart        |

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/HossamAhmed954074/Booking-Classes-Api.git
cd BookingClasses-api
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

Add the following environment variables (see [Environment Variables](#-environment-variables) section):

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/booking-classes-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

4. **Verify MongoDB connection**

Ensure your MongoDB instance is running:

```bash
# For local MongoDB
sudo systemctl status mongod

# Or use MongoDB Atlas connection string
```

---

## 🚀 Running the Application

### Development Mode

Run the server with auto-restart on file changes:

```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

You should see:

```
🚀 Server is running on port 3000
```

### Verifying the Server

Test the API root endpoint:

```bash
curl http://localhost:3000/
# Response: "Hello World!"
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

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
```

### Environment Variables Reference

| Variable         | Description                | Required | Default       |
| ---------------- | -------------------------- | -------- | ------------- |
| `PORT`           | Server port number         | No       | `3000`        |
| `NODE_ENV`       | Environment mode           | No       | `development` |
| `MONGODB_URI`    | MongoDB connection string  | **Yes**  | -             |
| `JWT_SECRET`     | Secret key for JWT signing | **Yes**  | -             |
| `JWT_EXPIRES_IN` | JWT token expiration time  | No       | `7d`          |

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

---

## 🔑 Authentication Endpoints

### 1. Register User

**POST** `/api/v1/auth/register`

Register a new user account (customer or business).

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Validation:**

- `name`: Required
- `email`: Required, valid email format
- `password`: Required, strong password (min 8 chars, uppercase, lowercase, number, symbol)
- `phone`: Required, valid mobile phone format
- `role`: Optional, defaults to "customer" (options: "customer", "business")

**Success Response (201 Created):**

```json
{
  "message": "User registered successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "status": "error",
  "message": "User already exists"
}
```

---

### 2. Login User

**POST** `/api/v1/auth/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Headers:**

```
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Error Response (401 Unauthorized):**

```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User

**GET** `/api/v1/auth/me`

Get currently authenticated user details.

**Query Parameters or Headers:**

```
?token=<jwt_token>
OR
x-auth-token: <jwt_token>
```

**Success Response (200 OK):**

```json
{
  "user": {
    "_id": "64abc123def456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "phone": "+1234567890",
    "credits": 50,
    "avatarUrl": "",
    "createdAt": "2024-11-15T10:30:00.000Z"
  }
}
```

---

## 🏢 Business Endpoints

### 1. List All Businesses

**GET** `/api/v1/businesses`

Get all active businesses with optional filtering.

**Query Parameters:**

- `q` (string): Search query for business name/description
- `type` (string): Filter by business type (e.g., "Gym", "Yoga Studio")
- `lat` (number): Latitude for geolocation search
- `lng` (number): Longitude for geolocation search
- `radius` (number): Search radius in meters (default: 5000)
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 20)

**Example Request:**

```bash
GET /api/v1/businesses?type=Gym&lat=40.7128&lng=-74.0060&radius=10000&page=1&limit=10
```

**Success Response (200 OK):**

```json
{
  "items": [
    {
      "_id": "64abc789def123",
      "userId": "64user123",
      "name": "Fitness Studio Pro",
      "type": "Gym",
      "description": "Premium fitness center with state-of-the-art equipment",
      "address": "123 Main St, New York, NY 10001",
      "location": {
        "type": "Point",
        "coordinates": [-74.006, 40.7128]
      },
      "rating": 4.5,
      "totalReviews": 120,
      "images": ["url1.jpg", "url2.jpg"],
      "amenities": ["Parking", "Showers", "WiFi", "Lockers"],
      "contactEmail": "info@fitnesspro.com",
      "contactPhone": "+1234567890",
      "isActive": true,
      "distance": 2500.5,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-11-20T14:22:00.000Z"
    }
  ],
  "page": 1,
  "limit": 10
}
```

---

### 2. Get Business by ID

**GET** `/api/v1/businesses/:id`

Get detailed information about a specific business.

**Success Response (200 OK):**

```json
{
  "_id": "64abc789def123",
  "userId": "64user123",
  "name": "Fitness Studio Pro",
  "type": "Gym",
  "description": "Premium fitness center",
  "address": "123 Main St, New York",
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128]
  },
  "rating": 4.5,
  "totalReviews": 120,
  "images": ["url1.jpg"],
  "amenities": ["Parking", "Showers"],
  "contactEmail": "info@fitnesspro.com",
  "contactPhone": "+1234567890",
  "isActive": true
}
```

**Error Response (404 Not Found):**

```json
{
  "status": "error",
  "message": "Business not found"
}
```

---

## 📅 Class Session Endpoints

### 1. List All Class Sessions

**GET** `/api/v1/class-sessions`

Get all scheduled class sessions with optional filtering.

**Query Parameters:**

- `businessId` (ObjectId): Filter by business
- `dateFrom` (ISO Date): Filter sessions from this date
- `dateTo` (ISO Date): Filter sessions until this date
- `level` (string): Filter by difficulty level
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Example Request:**

```bash
GET /api/v1/class-sessions?businessId=64abc789def123&dateFrom=2024-11-22&dateTo=2024-11-30&level=beginner
```

**Success Response (200 OK):**

```json
{
  "items": [
    {
      "_id": "64session123",
      "businessId": "64abc789def123",
      "instructorId": "64instructor123",
      "instructorName": "Jane Smith",
      "name": "Morning Yoga",
      "description": "Relaxing morning yoga session",
      "date": "2024-11-25T00:00:00.000Z",
      "startTime": "08:00",
      "endTime": "09:00",
      "duration": 60,
      "capacity": 20,
      "bookedSpots": 15,
      "credits": 10,
      "level": "beginner",
      "status": "scheduled",
      "isRecurring": false,
      "createdAt": "2024-11-20T10:00:00.000Z"
    }
  ],
  "page": 1,
  "limit": 20
}
```

---

### 2. Get Class Session by ID

**GET** `/api/v1/class-sessions/:id`

Get detailed information about a specific class session.

**Success Response (200 OK):**

```json
{
  "_id": "64session123",
  "businessId": "64abc789def123",
  "instructorId": "64instructor123",
  "instructorName": "Jane Smith",
  "name": "Morning Yoga",
  "description": "Relaxing morning yoga session",
  "date": "2024-11-25T00:00:00.000Z",
  "startTime": "08:00",
  "endTime": "09:00",
  "duration": 60,
  "capacity": 20,
  "bookedSpots": 15,
  "availableSpots": 5,
  "credits": 10,
  "level": "beginner",
  "status": "scheduled"
}
```

---

### 3. Create Class Session

**POST** `/api/v1/class-sessions`

Create a new class session (business role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Required Role:** `business` or `admin`

**Request Body:**

```json
{
  "businessId": "64abc789def123",
  "instructorId": "64instructor123",
  "instructorName": "Jane Smith",
  "name": "Evening Pilates",
  "description": "Core strengthening pilates class",
  "date": "2024-11-26T00:00:00.000Z",
  "startTime": "18:00",
  "endTime": "19:00",
  "duration": 60,
  "capacity": 15,
  "credits": 12,
  "level": "intermediate",
  "isRecurring": false
}
```

**Success Response (201 Created):**

```json
{
  "_id": "64newsession123",
  "businessId": "64abc789def123",
  "name": "Evening Pilates",
  "status": "scheduled",
  "bookedSpots": 0,
  ...
}
```

---

### 4. Update Class Session

**PUT** `/api/v1/class-sessions/:id`

Update an existing class session (business role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Required Role:** `business` or `admin`

**Request Body:** (partial update supported)

```json
{
  "capacity": 20,
  "credits": 15,
  "status": "cancelled"
}
```

**Success Response (200 OK):**

```json
{
  "_id": "64session123",
  "capacity": 20,
  "credits": 15,
  "status": "cancelled",
  ...
}
```

---

## 📝 Booking Endpoints

### 1. Create Booking

**POST** `/api/v1/bookings`

Create a new booking for a class session (customer role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
Idempotency-Key: <unique_key> (optional, recommended for payment operations)
```

**Required Role:** `customer`

**Request Body:**

```json
{
  "sessionId": "64session123",
  "notes": "First time attending"
}
```

**Process:**

1. Validates session availability
2. Checks user credit balance
3. Creates booking with MongoDB transaction
4. Deducts credits from user
5. Logs credit transaction
6. Increments booked spots
7. Sends notification to business owner

**Success Response (201 Created):**

```json
{
  "_id": "64booking123",
  "userId": "64user123",
  "businessId": "64business123",
  "sessionId": "64session123",
  "status": "pending",
  "credits": 10,
  "bookingDate": "2024-11-25T00:00:00.000Z",
  "notes": "First time attending",
  "createdAt": "2024-11-22T15:10:00.000Z"
}
```

**Error Responses:**

- **402 Payment Required:**

```json
{
  "status": "error",
  "message": "Insufficient credits"
}
```

- **409 Conflict:**

```json
{
  "status": "error",
  "message": "Class is full"
}
```

or

```json
{
  "status": "error",
  "message": "Duplicate booking detected"
}
```

---

### 2. List Bookings

**GET** `/api/v1/bookings`

Get all bookings (filtered by role).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**

- `status` (string): Filter by status (pending, confirmed, cancelled, declined)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Behavior:**

- **Customer role:** Returns only their own bookings
- **Business role:** Returns all bookings for their business

**Success Response (200 OK):**

```json
{
  "items": [
    {
      "_id": "64booking123",
      "userId": "64user123",
      "businessId": "64business123",
      "sessionId": "64session123",
      "status": "pending",
      "credits": 10,
      "bookingDate": "2024-11-25T00:00:00.000Z",
      "notes": "First time attending",
      "createdAt": "2024-11-22T15:10:00.000Z"
    }
  ],
  "page": 1,
  "limit": 20
}
```

---

### 3. Get Booking by ID

**GET** `/api/v1/bookings/:id`

Get detailed information about a specific booking.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Access Control:**

- Customers can only view their own bookings
- Businesses can view all bookings

**Success Response (200 OK):**

```json
{
  "_id": "64booking123",
  "userId": "64user123",
  "businessId": "64business123",
  "sessionId": "64session123",
  "status": "pending",
  "credits": 10,
  "bookingDate": "2024-11-25T00:00:00.000Z",
  "notes": "First time attending",
  "confirmedAt": null,
  "createdAt": "2024-11-22T15:10:00.000Z"
}
```

---

### 4. Update Booking

**PUT** `/api/v1/bookings/:id`

Update booking details (customer role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Required Role:** `customer`

**Request Body:**

```json
{
  "notes": "Updated notes"
}
```

**Success Response (200 OK):**

```json
{
  "_id": "64booking123",
  "notes": "Updated notes",
  ...
}
```

---

### 5. Confirm or Cancel Booking

**PUT** `/api/v1/bookings/:id/confirmOrCancel`

Confirm or cancel a booking (business role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Required Role:** `business`

**Request Body:**

```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**

- `confirmed`
- `cancelled`

**Success Response (200 OK):**

```json
{
  "_id": "64booking123",
  "status": "confirmed",
  "confirmedAt": "2024-11-22T15:30:00.000Z",
  ...
}
```

---

### 6. Delete Booking

**DELETE** `/api/v1/bookings/:id`

Delete a booking (customer role required).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Required Role:** `customer`

**Success Response (200 OK):**

```json
{
  "_id": "64booking123",
  "status": "cancelled",
  ...
}
```

---

## 💳 Credit Endpoints

### 1. List Credit Packages

**GET** `/api/v1/credits/packages`

Get all available credit packages.

**Success Response (200 OK):**

```json
[
  {
    "_id": "64package123",
    "name": "Starter Pack",
    "credits": 10,
    "priceUSD": 50,
    "discountPercent": 0,
    "isPopular": false,
    "isActive": true,
    "description": "Perfect for trying out our services",
    "validityDays": 30,
    "createdAt": "2024-01-10T00:00:00.000Z"
  },
  {
    "_id": "64package456",
    "name": "Premium Pack",
    "credits": 50,
    "priceUSD": 200,
    "discountPercent": 20,
    "isPopular": true,
    "isActive": true,
    "description": "Best value for regular users",
    "validityDays": 90,
    "createdAt": "2024-01-10T00:00:00.000Z"
  }
]
```

---

### 2. Purchase Credit Package

**POST** `/api/v1/credits/purchase`

Purchase a credit package (authenticated users only).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "packageId": "64package123"
}
```

**Process:**

1. Validates package existence
2. Simulates payment (ready for payment gateway integration)
3. Adds credits to user account
4. Creates credit transaction record

**Success Response (200 OK):**

```json
{
  "success": true,
  "credits": 60
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "Package not found"
}
```

---

## 👨‍🏫 Instructor Endpoints

### 1. List All Instructors

**GET** `/api/v1/instructors`

Get all instructors.

**Success Response (200 OK):**

```json
{
  "items": [
    {
      "_id": "64instructor123",
      "userId": "64user456",
      "businessId": "64business123",
      "name": "Jane Smith",
      "bio": "Certified yoga instructor with 10 years experience",
      "specialties": ["Yoga", "Pilates", "Meditation"],
      "certifications": ["RYT-500", "CPR Certified"],
      "photo": "photo_url.jpg",
      "rating": 4.8,
      "totalClasses": 250,
      "isActive": true,
      "createdAt": "2024-01-05T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Instructor by ID

**GET** `/api/v1/instructors/:id`

Get detailed information about a specific instructor.

**Success Response (200 OK):**

```json
{
  "_id": "64instructor123",
  "userId": "64user456",
  "businessId": "64business123",
  "name": "Jane Smith",
  "bio": "Certified yoga instructor",
  "specialties": ["Yoga", "Pilates"],
  "certifications": ["RYT-500"],
  "photo": "photo_url.jpg",
  "rating": 4.8,
  "totalClasses": 250,
  "isActive": true
}
```

**Error Response (404 Not Found):**

```json
{
  "status": "error",
  "message": "Instructor not found"
}
```

---

### 3. Create Instructor

**POST** `/api/v1/instructors`

Create a new instructor profile.

**Request Body:**

```json
{
  "userId": "64user456",
  "businessId": "64business123",
  "name": "John Trainer",
  "bio": "Professional fitness instructor",
  "specialties": ["Strength Training", "HIIT"],
  "certifications": ["ACE Certified", "CPR"],
  "photo": "photo_url.jpg"
}
```

**Success Response (201 Created):**

```json
{
  "_id": "64newinstructor123",
  "name": "John Trainer",
  "rating": 0,
  "totalClasses": 0,
  "isActive": true,
  ...
}
```

**Error Response (400 Bad Request):**

```json
{
  "status": "error",
  "message": "Instructor with this userId already exists"
}
```

---

## 📁 Project Structure

```
BookingClasses-api/
├── app.js                          # Application entry point
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables (gitignored)
├── .gitignore                      # Git ignore rules
│
├── controllers/                    # Request handlers (Business Logic)
│   ├── authController.js           # User registration, login, JWT authentication
│   ├── bookingsController.js       # Booking CRUD with transaction safety
│   ├── businessController.js       # Business management, geolocation search
│   ├── classSessionController.js   # Class session CRUD operations
│   ├── creditsController.js        # Credit package and purchase logic
│   └── instructorsContrroler.js    # Instructor management
│
├── models/                         # Mongoose schemas (Data Layer)
│   ├── userModel.js                # User schema with JWT generation
│   ├── businessModel.js            # Business with geolocation support
│   ├── classSession.js             # Class session with capacity tracking
│   ├── bookingModel.js             # Booking with unique constraint
│   ├── instructorModel.js          # Instructor profiles
│   ├── creditPackage.js            # Credit package pricing
│   ├── creditTransictionModel.js   # Transaction logging
│   ├── notificationModel.js        # Event notifications
│   ├── reviewsModel.js             # Reviews and ratings
│   └── analyticsModel.js           # Business analytics
│
├── routers/                        # Route definitions (API Layer)
│   ├── auth.js                     # /api/v1/auth routes
│   ├── businessRoutes.js           # /api/v1/businesses routes
│   ├── classSessionRouters.js      # /api/v1/class-sessions routes
│   ├── bookingsRouters.js          # /api/v1/bookings routes
│   ├── creditsRoutes.js            # /api/v1/credits routes
│   └── instructorsRoutes.js        # /api/v1/instructors routes
│
├── middleware/                     # Custom middleware
│   ├── authMW.js                   # JWT verification & RBAC
│   ├── asyncWraper.js              # Async error handler wrapper
│   └── appLimiterMW.js             # Rate limiting configuration
│
├── data/                           # Database configuration
│   └── db.js                       # MongoDB connection
│
├── errors/                         # Error handling
│   └── appError.js                 # Custom error class
│
├── utils/                          # Utility functions
│   ├── httpStatusConstant.js       # HTTP status constants
│   └── idempotency.js              # Idempotency key handler
│
└── Postman/                        # API Testing
    ├── BookingClasses_API.postman_collection.json
    └── BookingClasses_API.postman_environment.json
```

---

## 🗄️ Database Schema

### ERD Overview

```
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│    User     │──────▶│   Business   │──────▶│  ClassSession   │
│             │       │              │       │                 │
│  - credits  │       │  - location  │       │  - capacity     │
│  - role     │       │  - rating    │       │  - bookedSpots  │
└──────┬──────┘       └──────┬───────┘       └────────┬────────┘
       │                     │                        │
       │                     │                        │
       ▼                     ▼                        ▼
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│   Booking   │       │   Review     │       │   Instructor    │
│             │       │              │       │                 │
│  - status   │       │  - rating    │       │  - specialties  │
└──────┬──────┘       └──────────────┘       └─────────────────┘
       │
       ▼
┌──────────────────┐
│ CreditTransaction│
│                  │
│  - type: usage   │
└──────────────────┘
```

### Collections Details

#### **users**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, validated),
  password: String (bcrypt hashed),
  role: String (enum: ['customer', 'business']),
  phone: String (unique, validated),
  avatarUrl: String,
  credits: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `email` (unique)
- `phone` (unique)

**Methods:**

- `genAuthToken()`: Generates JWT token

---

#### **businesses**

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
    coordinates: [Number, Number]  // [longitude, latitude]
  },
  rating: Number (0-5),
  totalReviews: Number,
  images: [String],
  amenities: [String],
  contactEmail: String,
  contactPhone: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `location` (2dsphere for geospatial queries)

---

#### **class_sessions**

```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: 'Business', indexed),
  instructorId: ObjectId (ref: 'Instructor'),
  instructorName: String,
  name: String,
  description: String,
  date: Date (indexed),
  startTime: String,
  endTime: String,
  duration: Number,
  capacity: Number,
  bookedSpots: Number (default: 0),
  credits: Number,
  level: String,
  status: String (enum: ['scheduled', 'cancelled', 'completed'], indexed),
  isRecurring: Boolean,
  recurringPattern: Object,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `businessId`
- `date`
- `status`

---

#### **bookings**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  businessId: ObjectId (ref: 'Business', indexed),
  sessionId: ObjectId (ref: 'ClassSession', indexed),
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'declined'], indexed),
  credits: Number,
  bookingDate: Date,
  notes: String,
  confirmedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

- `userId`
- `businessId`
- `sessionId`
- `status`
- **Unique Compound Index:** `{ userId: 1, sessionId: 1 }` (prevents duplicate bookings)

---

#### **instructors**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  businessId: ObjectId (ref: 'Business', required),
  name: String,
  bio: String,
  specialties: [String],
  certifications: [String],
  photo: String,
  rating: Number,
  totalClasses: Number,
  isActive: Boolean,
  createdAt: Date
}
```

---

#### **credit_packages**

```javascript
{
  _id: ObjectId,
  name: String,
  credits: Number,
  priceUSD: Number,
  discountPercent: Number,
  isPopular: Boolean,
  isActive: Boolean,
  description: String,
  validityDays: Number,
  createdAt: Date
}
```

---

#### **credit_transactions**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  type: String (enum: ['purchase', 'usage', 'refund', 'adjustment']),
  amount: Number,
  balance: Number,
  credits: Number,
  description: String,
  paymentMethod: String,
  paymentId: String,
  bookingId: ObjectId (ref: 'Booking'),
  priceUSD: Number,
  createdAt: Date
}
```

**Indexes:**

- `userId`

---

#### **reviews**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  businessId: ObjectId (ref: 'Business'),
  sessionId: ObjectId (ref: 'ClassSession'),
  bookingId: ObjectId (ref: 'Booking'),
  rating: Number,
  title: String,
  comment: String,
  isVerified: Boolean,
  response: {
    text: String,
    respondedAt: Date,
    respondedBy: ObjectId
  },
  createdAt: Date
}
```

---

#### **notifications**

```javascript
{
  _id: ObjectId,
  recipientId: ObjectId (ref: 'User', indexed),
  type: String,
  title: String,
  message: String,
  relatedEntityType: String,
  relatedEntityId: ObjectId,
  isRead: Boolean (indexed),
  actionUrl: String,
  createdAt: Date
}
```

**Indexes:**

- `recipientId`
- `isRead`

---

#### **analytics**

```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: 'Business', indexed),
  date: Date,
  period: String,
  metrics: Object,
  createdAt: Date
}
```

**Indexes:**

- `businessId`

---

## 🔒 Authentication & Authorization

### JWT Authentication Flow

1. **User Registration/Login** → Server generates JWT
2. **Token Contains:**
   - User ID
   - Email
   - Name
   - Role
   - Avatar URL
   - Credits
3. **Client Stores Token** (localStorage/cookie)
4. **Authenticated Requests** → Include token in header:
   ```
   Authorization: Bearer <token>
   ```
5. **Server Validates Token** → Extract user info from JWT

### JWT Token Structure

```javascript
{
  id: "64abc123def456",
  email: "user@example.com",
  name: "John Doe",
  role: "customer",
  avatarUrl: "https://...",
  credits: 50,
  iat: 1700000000,   // Issued at
  exp: 1700604800    // Expires at (7 days)
}
```

### Role-Based Access Control (RBAC)

| Route                                  | Method | Roles Allowed       | Description                      |
| -------------------------------------- | ------ | ------------------- | -------------------------------- |
| `/api/v1/auth/register`                | POST   | Public              | User registration                |
| `/api/v1/auth/login`                   | POST   | Public              | User login                       |
| `/api/v1/auth/me`                      | GET    | Public (with token) | Get current user                 |
| `/api/v1/businesses`                   | GET    | Public              | List businesses                  |
| `/api/v1/businesses/:id`               | GET    | Public              | Get business details             |
| `/api/v1/class-sessions`               | GET    | Public              | List class sessions              |
| `/api/v1/class-sessions/:id`           | GET    | Public              | Get session details              |
| `/api/v1/class-sessions`               | POST   | `business`, `admin` | Create class session             |
| `/api/v1/class-sessions/:id`           | PUT    | `business`, `admin` | Update class session             |
| `/api/v1/bookings`                     | POST   | `customer`          | Create booking                   |
| `/api/v1/bookings`                     | GET    | Authenticated       | List bookings (filtered by role) |
| `/api/v1/bookings/:id`                 | GET    | Authenticated       | Get booking details              |
| `/api/v1/bookings/:id`                 | PUT    | `customer`          | Update booking                   |
| `/api/v1/bookings/:id`                 | DELETE | `customer`          | Delete booking                   |
| `/api/v1/bookings/:id/confirmOrCancel` | PUT    | `business`          | Confirm/cancel booking           |
| `/api/v1/credits/packages`             | GET    | Public              | List credit packages             |
| `/api/v1/credits/purchase`             | POST   | Authenticated       | Purchase credits                 |
| `/api/v1/instructors`                  | GET    | Public              | List instructors                 |
| `/api/v1/instructors/:id`              | GET    | Public              | Get instructor details           |
| `/api/v1/instructors`                  | POST   | Public              | Create instructor                |

### Security Features

✅ **Password Hashing:** bcryptjs with 10 salt rounds  
✅ **JWT Secret:** Environment-based secret key  
✅ **Token Expiration:** Configurable (default 7 days)  
✅ **Helmet.js:** Security headers  
✅ **Rate Limiting:** Prevents brute-force attacks  
✅ **CORS:** Controlled cross-origin access  
✅ **Input Validation:** Email, phone, password strength validation  
✅ **Error Sanitization:** No sensitive data in error responses

---

## 🚀 Advanced Features

### 1. MongoDB Transactions

The booking system uses **MongoDB transactions** to ensure data consistency:

```javascript
// Pseudocode flow
const session = await mongoose.startSession();
session.startTransaction();
try {
  // 1. Check class availability
  // 2. Verify user credits
  // 3. Create booking
  // 4. Deduct credits
  // 5. Log transaction
  // 6. Increment booked spots
  // 7. Create notification
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
}
```

**Benefits:**

- Atomic operations
- No partial failures
- Data consistency guaranteed

---

### 2. Idempotency Support

Prevents duplicate bookings from network retries:

**Usage:**

```bash
POST /api/v1/bookings
Idempotency-Key: unique-key-12345
```

**How it works:**

1. First request with key → Process normally
2. Duplicate request with same key → Return cached result
3. No double-charging or duplicate bookings

---

### 3. Geolocation & Proximity Search

**Find businesses within radius:**

```bash
GET /api/v1/businesses?lat=40.7128&lng=-74.0060&radius=5000
```

**Uses MongoDB's 2dsphere index:**

- Fast geospatial queries
- Distance calculation
- Location-based filtering

---

### 4. Credit Transaction Logging

Every credit change is logged:

**Transaction Types:**

- `purchase`: Bought credits
- `usage`: Used for booking
- `refund`: Booking cancellation refund
- `adjustment`: Manual admin adjustment

**Provides:**

- Complete audit trail
- Balance tracking
- Transaction history

---

### 5. Automatic Notifications

System automatically creates notifications:

**Triggers:**

- New booking → Notify business owner
- Booking confirmed → Notify customer
- Booking cancelled → Notify both parties
- Class reminder → Notify attendees

---

### 6. Error Handling

**Centralized error handler:**

- Custom error class
- HTTP status code mapping
- Sanitized error messages
- Development vs. production modes

**Error Response Format:**

```json
{
  "status": "error",
  "message": "User-friendly error message"
}
```

---

### 7. Pagination

All list endpoints support pagination:

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**

```json
{
  "items": [...],
  "page": 1,
  "limit": 20
}
```

---

## 🧪 Testing with Postman

### Import Postman Collection

1. Open Postman
2. Click **Import** button
3. Select files:
   - `BookingClasses_API.postman_collection.json`
   - `BookingClasses_API.postman_environment.json`

### Environment Variables

Update the environment with:

- `baseUrl`: `http://localhost:3000/api/v1`
- `token`: Will be auto-set after login

### Testing Workflow

1. **Register User** → `POST /auth/register`
2. **Login** → `POST /auth/login` → Token saved automatically
3. **Get User Info** → `GET /auth/me`
4. **List Businesses** → `GET /businesses`
5. **List Class Sessions** → `GET /class-sessions`
6. **Purchase Credits** → `POST /credits/purchase`
7. **Create Booking** → `POST /bookings`
8. **List My Bookings** → `GET /bookings`

### Quick Test Commands

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!@#","phone":"+1234567890"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#"}'

# Get businesses
curl http://localhost:3000/api/v1/businesses

# Create booking (with auth)
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"SESSION_ID"}'
```

---

## 📊 API Response Status Codes

| Code | Status                | Description                             |
| ---- | --------------------- | --------------------------------------- |
| 200  | OK                    | Request successful                      |
| 201  | Created               | Resource created successfully           |
| 400  | Bad Request           | Invalid input data or missing fields    |
| 401  | Unauthorized          | Missing or invalid authentication token |
| 402  | Payment Required      | Insufficient credits                    |
| 403  | Forbidden             | User doesn't have required permissions  |
| 404  | Not Found             | Resource doesn't exist                  |
| 409  | Conflict              | Duplicate booking or resource conflict  |
| 429  | Too Many Requests     | Rate limit exceeded                     |
| 500  | Internal Server Error | Unexpected server error                 |

---

## 🎯 Future Enhancements

- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] Email notifications via SendGrid/Mailgun
- [ ] SMS notifications via Twilio
- [ ] Real-time updates using WebSockets
- [ ] Admin dashboard and analytics
- [ ] Class waitlist functionality
- [ ] Recurring payment subscriptions
- [ ] Multi-language support
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Automated testing suite
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 👨‍💻 Contact

For questions or support, please contact the development team.

---

## 📝 Notes

- This API is ready for production with proper environment configuration
- Payment integration is currently mocked for development
- MongoDB replica set is required for transaction support
- Rate limiting is enabled by default (adjust in middleware if needed)

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**
