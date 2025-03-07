# Travel Planner Backend

The backend API for the Travel Planner application, built with Node.js, Express, and MongoDB.

## Features

- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT authentication and route protection
- Error handling middleware
- Logging with Winston
- Rate limiting for API protection
- Email notifications using Nodemailer
- File uploads with Multer
- Comprehensive test suite with Jest

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database connection, JWT secret, and email settings.

3. Start the development server:

```bash
npm run dev
```

### Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with Nodemon
- `npm test` - Run tests

## Project Structure

```
src/
├── api/                  # API components
│   ├── controllers/      # Route controllers
│   └── routes/           # Express routes
├── config/               # Configuration files
│   └── db.js             # Database connection
├── middlewares/          # Express middlewares
│   ├── auth.js           # Authentication middleware
│   └── errorHandler.js   # Error handling middleware
├── models/               # Mongoose models
│   ├── UserModel.js
│   ├── TripModel.js
│   ├── ExpenseModel.js
│   ├── PackingItemModel.js
│   └── CommentModel.js
├── utils/                # Utility functions
│   ├── email.js          # Email sending functions
│   └── logger.js         # Winston logger configuration
└── app.js                # Express app setup
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/forgot-password` - Request password reset
  - Body: `{ email }`
- `PUT /api/auth/reset-password/:resetToken` - Reset password
  - Body: `{ password }`

### Trips

- `GET /api/trips` - Get all user trips
  - Query params: `sort`, `page`, `limit`, `status`
- `POST /api/trips` - Create a new trip
  - Body: `{ name, destination, startDate, endDate, description, ... }`
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/trips/search` - Search trips
  - Query params: `q` (search term)

### Expenses

- `POST /api/expenses` - Create expense
  - Body: `{ trip, category, amount, currency, date, ... }`
- `GET /api/expenses/trip/:tripId` - Get trip expenses
- `GET /api/expenses/:id` - Get expense details
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/trip/:tripId/summary` - Get expense summary

### Packing

- `POST /api/packing` - Add packing item
  - Body: `{ trip, name, category, quantity, isPacked }`
- `GET /api/packing/trip/:tripId` - Get trip packing list
- `PUT /api/packing/:id` - Update packing item
- `PATCH /api/packing/:id/toggle` - Toggle packed status
- `DELETE /api/packing/:id` - Delete packing item
- `POST /api/packing/bulk` - Bulk create packing items
  - Body: `{ tripId, items: [{ name, category, ... }, ...] }`

### Collaboration

- `POST /api/collaboration/trip/:tripId/collaborator` - Add collaborator
  - Body: `{ email, role }`
- `DELETE /api/collaboration/trip/:tripId/collaborator/:userId` - Remove collaborator
- `PUT /api/collaboration/trip/:tripId/collaborator/:userId` - Update collaborator role
  - Body: `{ role }`
- `GET /api/collaboration/trip/:tripId/collaborators` - Get collaborators
- `DELETE /api/collaboration/trip/:tripId/leave` - Leave trip

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource not found
- `500 Server Error` - Server-side error

Error responses follow this format:

```json
{
  "success": false,
  "message": "Error message description"
}
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Testing

Run tests with Jest:

```bash
npm test
```

## License

This project is licensed under the MIT License.
