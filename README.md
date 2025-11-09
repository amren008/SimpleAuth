# SimpleAuth

A modern full-stack authentication system built with React, TypeScript, Express, and PostgreSQL. This project demonstrates secure authentication implementation using industry-standard practices and technologies.

## Features

- **Secure Authentication**: JWT-based authentication with httpOnly cookies
- **Password Security**: Bcrypt hashing with salt rounds
- **Input Validation**: Server-side validation using Zod schemas
- **Protected Routes**: Middleware-based route protection
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Modern UI**: Clean, responsive design with VS Code-inspired theme
- **Database**: PostgreSQL with Docker containerization

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing with protected routes
- **TanStack Query** - Powerful data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool with HMR

### Backend
- **Node.js & Express** - Web framework for REST API
- **TypeScript** - End-to-end type safety
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation

### DevOps
- **Docker** - Container orchestration
- **PostgreSQL 16** - Dockerized database

## Project Structure

```
SimpleAuth/
├── api/                      # Backend application
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── db/              # Database connection
│   │   ├── middleware/      # Auth & validation middleware
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions (JWT, bcrypt)
│   └── package.json
├── web/                      # Frontend application
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   ├── styles/             # Style configurations
│   └── package.json
└── docker-compose.yml       # Docker configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amren008/SimpleAuth.git
   cd SimpleAuth
   ```

2. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

3. **Set up the backend**
   ```bash
   cd api
   npm install
   ```

   Create a `.env` file in the `api` directory:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/authdb
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```

4. **Set up the frontend**
   ```bash
   cd ../web
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Body: `{ name, username, email, password }`
  - Returns: User object and JWT token

- `POST /api/auth/login` - Authenticate user
  - Body: `{ email, password }`
  - Returns: User object and JWT token

- `POST /api/auth/logout` - Clear authentication cookie
  - Returns: Success message

- `GET /api/auth/me` - Get current user (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Current user details

## Pages

- **Overview** (`/home`) - Project introduction and features
- **Tech Stack** (`/about`) - Detailed technology breakdown with side navigation
- **Dashboard** (`/dashboard`) - User profile and session information (Protected)
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration

## Security Features

- Password hashing using bcrypt with 10 salt rounds
- JWT tokens stored in httpOnly cookies (3-hour expiry)
- Protected API endpoints with authentication middleware
- Input validation on all requests using Zod schemas
- CORS configuration for cross-origin requests
- SQL injection prevention through parameterized queries

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Backend Development
```bash
cd api
npm run dev
```

### Frontend Development
```bash
cd web
npm run dev
```

### Database Management

View PostgreSQL logs:
```bash
docker-compose logs postgres
```

Access PostgreSQL CLI:
```bash
docker exec -it simpleauth-postgres-1 psql -U postgres -d authdb
```

Stop database:
```bash
docker-compose down
```

## Environment Variables

### Backend (`api/.env`)
```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/authdb
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend
The frontend uses the API URL configured in `web/src/api/auth.ts`:
```typescript
const API_URL = "http://localhost:3000";
```

## Building for Production

### Backend
```bash
cd api
npm run build
npm start
```

### Frontend
```bash
cd web
npm run build
```

The build output will be in the `web/dist` directory.

## Architecture

### Frontend Architecture
- Component-based structure
- Custom hooks for authentication logic
- Protected route wrapper component
- API layer abstraction
- Centralized state management with TanStack Query

### Backend Architecture
- MVC pattern
- Middleware-based validation
- Centralized error handling
- Database connection pooling
- Environment-based configuration

## Contributing

This is a portfolio project, but suggestions and feedback are welcome. Feel free to open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

## Author

**Amarendra**
- GitHub: [@amren008](https://github.com/amren008)

## Acknowledgments

Built as a portfolio project to demonstrate:
- Full-stack development capabilities
- Secure authentication practices
- Modern web technologies
- Clean code architecture
- TypeScript proficiency
