# Travel Planner Frontend

The frontend for the Travel Planner application, built with React, TypeScript, and Tailwind CSS.

## Features

- Modern React with functional components and hooks
- Type safety with TypeScript
- Beautiful UI with Tailwind CSS
- Responsive design for mobile, tablet, and desktop
- Client-side routing with React Router
- Form handling and validation
- Interactive trip planning tools
- Expense tracking and visualization
- Packing list management
- Collaboration features

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint the codebase
- `npm run test` - Run tests

## Project Structure

```
src/
├── assets/               # Static assets
├── components/           # Reusable components
│   ├── layout/           # Layout components
│   ├── trips/            # Trip-related components
│   ├── expenses/         # Expense-related components
│   ├── collaboration/    # Collaboration components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ai/               # AI-related components
├── pages/                # Page components
│   ├── auth/             # Authentication pages
│   ├── trips/            # Trip pages
│   ├── expenses/         # Expense pages
│   └── settings/         # User settings pages
├── lib/                  # Utility functions and hooks
│   ├── api.ts            # API client
│   ├── auth.ts           # Authentication utilities
│   ├── date.ts           # Date utilities
│   └── validation.ts     # Form validation utilities
├── styles/               # Global styles
├── App.tsx               # Main App component
└── main.tsx              # Application entry point
```

## Main Features

### Trip Management

The app allows users to:

- Create new trips with destination, dates, and details
- View a list of all trips
- Filter trips by status (planning, upcoming, ongoing, completed)
- View detailed trip information with itineraries
- Edit trip details and itineraries
- Delete trips

### Expense Tracking

The app provides:

- Expense entry with categories, amounts, and dates
- Expense summaries by category
- Expense splitting between trip members
- Budget tracking against actual expenses

### Packing Lists

The app includes:

- Creating categorized packing lists
- Checking off packed items
- Bulk item creation
- Smart suggestions based on trip type and duration

### Collaboration

The app enables:

- Inviting others to view or edit trips
- Different permission levels (viewer, editor, owner)
- Activity tracking for collaborative changes
- Commenting on trip elements

## Styling

The app uses Tailwind CSS for styling with a custom theme defined in `tailwind.config.js`.

Key design tokens:

- Primary color: `#3b82f6` (blue-500)
- Secondary color: `#10b981` (emerald-500)
- Error color: `#ef4444` (red-500)
- Background: `#ffffff` (white)
- Text: `#1f2937` (gray-800)

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api` (or the URL specified in environment variables).

API requests are handled through a custom client in `src/lib/api.ts`.

## Authentication

The app uses JWT tokens for authentication, stored in localStorage. Protected routes redirect unauthenticated users to the login page.

## Error Handling

API errors are caught and displayed to the user with appropriate messages. Form validation errors are displayed inline.

## Responsive Design

The UI is responsive and works on:

- Mobile devices (min-width: 320px)
- Tablets (min-width: 768px)
- Desktops (min-width: 1024px)

## License

This project is licensed under the MIT License.
