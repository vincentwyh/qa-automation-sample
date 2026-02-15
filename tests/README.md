# Feedback Wall Application

A full-stack web application for creating and sharing feedback between users. Built with Vue 3, Express, PostgreSQL, and Prisma ORM, featuring comprehensive E2E and API testing with Playwright.

## Features

- 🔐 **User Authentication** - Secure JWT-based authentication system
- 💬 **Feedback Management** - Create, view, and manage feedback between users
- 🎨 **Modern UI** - Built with Vue 3, Tailwind CSS, and HeadlessUI components
- 🧪 **Comprehensive Testing** - Full E2E and API test coverage using Playwright
- 🐳 **Docker Support** - Containerized PostgreSQL database
- 📊 **Type Safety** - End-to-end TypeScript implementation

## Tech Stack

### Frontend
- Vue 3 with Composition API
- Pinia for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Express.js with TypeScript
- Routing Controllers for clean API structure
- Prisma ORM for database management
- JWT for authentication
- Class Validator & Class Transformer for validation

### Testing
- Playwright for E2E and API testing
- Page Object Model architecture
- Faker.js for test data generation

### Database
- PostgreSQL with Prisma ORM

## Prerequisites

- Node.js >= 18.17.1
- Docker

## Getting Started

For a fresh setup from scratch:

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start database
docker-compose up -d

# 4. Setup database
npm run db:migrate
npm run db:seed

# 5. Install Playwright browsers
npx playwright install

# 6. Run tests
npm test
```

**To run the application locally:**
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start both API server and client in development mode
- `npm run dev:service` - Start only the API server
- `npm run dev:client` - Start only the client
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data

## Testing

The project includes comprehensive E2E and API tests built with Playwright.

### Running Tests

**Prerequisites:**
- Docker is running with PostgreSQL database
- Database is migrated and seeded
- Playwright browsers installed (`npx playwright install`)

**Test Commands:**
```bash
# Run all tests (E2E + API)
npm test

# Run only E2E tests
npm run test:e2e

# Run only API tests
npm run test:api

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests with browser visible
npm run test:headed

# View test report
npm run test:report
```

**Note:** Tests automatically start the development server if not already running.

### Test Architecture

The test suite follows industry best practices:

- **Page Object Model (POM)** - Separation of page structure from test logic
- **Page Actions** - Reusable high-level actions with built-in assertions
- **Assertion Helpers** - Clean test files with no expect statements
- **Centralized Test Data** - All test data managed in dedicated files with Faker.js
- **Type Safety** - Full TypeScript implementation

### Test Coverage

**E2E Tests:**
- User authentication and navigation
- Feedback creation workflow
- Feedback wall display
- Modal interactions and form validation
- Complete user journeys

**API Tests:**
- POST /feedback endpoint validation
- GET /feedback endpoint validation
- Authentication requirements
- Data validation and constraints
- Edge cases and error handling

For detailed testing documentation, see [tests/README.md](./tests/README.md)

## Project Structure

```
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Prisma schema definition
│   ├── seed.ts           # Database seeding script
│   └── migrations/       # Migration history
├── src/
│   ├── api/              # Backend API
│   │   ├── modules/      # Feature modules (auth, feedback)
│   │   ├── config/       # Configuration
│   │   └── utils/        # Utilities (db, logger, helpers)
│   ├── components/       # Vue components
│   ├── stores/           # Pinia state management
│   ├── router/           # Vue Router configuration
│   ├── views/            # Page components
│   └── util/             # Frontend utilities
├── tests/                # Playwright tests
│   ├── e2e/              # E2E test files
│   ├── api/              # API test files
│   └── src/
│       ├── page-objects/ # Page Object Model
│       ├── page-actions/ # Reusable actions
│       ├── helpers/      # Test helpers
│       ├── fixtures/     # Test fixtures
│       └── test-data/    # Test data
└── public/               # Static assets
```

## Database Schema

### User
- Authentication and profile information
- Relations to given and received feedback

### Feedback
- Title and body content
- Author and receiver relationships
- Timestamps for creation and updates

## Key Features Implementation

### Authentication System
- JWT-based token authentication
- Secure password hashing with bcrypt
- Protected API routes
- Frontend auth state management with Pinia

### Feedback Management
- Create feedback for other users
- View all feedback on the feedback wall
- Real-time UI updates
- Form validation on frontend and backend

### API Architecture
- RESTful API design
- Routing Controllers for clean route definitions
- Class-based validators and transformers
- Comprehensive error handling
- CORS and body parsing middleware

## Development Highlights

### Code Quality
- Full TypeScript implementation across frontend, backend, and tests
- ESLint configuration for code consistency
- Class-based architecture for backend modules
- Component-based architecture for frontend

### Testing Excellence
- Page Object Model for maintainable E2E tests
- API testing integrated with Playwright
- Reusable test helpers and fixtures
- Dynamic test data generation with Faker.js
- Clear separation of concerns in test architecture

### Developer Experience
- Hot reload for both frontend and backend
- Concurrent development servers
- Docker Compose for easy database setup
- Prisma for type-safe database operations
- Clear error messages and logging

## Future Enhancements

Potential improvements for the application:

- Add feedback editing and deletion
- Implement pagination for feedback wall
- Add user profiles with avatars
- Real-time updates using WebSockets
- Feedback filtering and search
- Email notifications
- File attachments for feedback
- Rich text editor for feedback content
- User roles and permissions
- Analytics dashboard

## License

This project is a sample QA automation implementation.

---

Built with ❤️ using Vue 3, Express, PostgreSQL, and Prisma

