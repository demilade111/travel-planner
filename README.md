# Travel Planner

A comprehensive travel planning application that helps you organize trips, track expenses, create packing lists, and collaborate with friends and family.



## Live Demo

Check out the live demo: [Travel Planner](https://travel-planner-new-demi.vercel.app/)

## Features

- **Trip Management**: Create, view, edit, and delete trips with detailed itineraries
- **Expense Tracking**: Track and categorize expenses for your trips
- **Packing Lists**: Create and manage packing lists with item categories and status tracking
- **Collaboration**: Share trips with friends and family, with different permission levels
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **AI Assistance**: Get intelligent travel recommendations and suggestions

## Tech Stack

### Frontend

- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Date-fns for date manipulation

### Backend

- Node.js and Express for API
- MongoDB and Mongoose for database
- JWT for authentication
- Winston for logging
- Nodemailer for email notifications

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

#### Clone the repository

```bash
git clone https://github.com/yourusername/travel-planner.git
cd travel-planner
```

#### Backend Setup

```bash
cd Travel-planner/travel-planner-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database connection, email settings, and JWT secret

# Start the development server
npm run dev
```

#### Frontend Setup

```bash
cd Travel-planner/travel-planner-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel-planner
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@travelplanner.com
FRONTEND_URL=http://localhost:3000
```

## API Documentation

The API is organized around RESTful principles. It accepts JSON request bodies, returns JSON responses, and uses standard HTTP response codes.

### Base URL

```
http://localhost:5000/api
```

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Main Resources

#### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

#### Trips

- `GET /api/trips` - Get all user trips
- `POST /api/trips` - Create a new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

#### Expenses

- `POST /api/expenses` - Create expense
- `GET /api/expenses/trip/:tripId` - Get trip expenses
- `GET /api/expenses/:id` - Get expense details
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/trip/:tripId/summary` - Get expense summary

#### Packing

- `POST /api/packing` - Add packing item
- `GET /api/packing/trip/:tripId` - Get trip packing list
- `PUT /api/packing/:id` - Update packing item
- `PATCH /api/packing/:id/toggle` - Toggle packed status
- `DELETE /api/packing/:id` - Delete packing item
- `POST /api/packing/bulk` - Bulk create packing items

#### Collaboration

- `POST /api/collaboration/trip/:tripId/collaborator` - Add collaborator
- `
