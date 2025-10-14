# 🚀 Hono JWT Authentication API

A modern, high-performance REST API built with **Hono** and **Bun**, featuring JWT authentication, PostgreSQL database integration, and comprehensive user management. This project demonstrates clean architecture patterns, type safety, and modern JavaScript/TypeScript best practices.

## ✨ Features

- **🔐 JWT Authentication** - Secure user registration and login with JSON Web Tokens
- **👥 User Management** - Full CRUD operations for user accounts
- **🛡️ Route Protection** - Middleware-based authentication for protected endpoints
- **📊 Database Integration** - PostgreSQL with Drizzle ORM for type-safe database operations
- **✅ Input Validation** - Zod schema validation with custom error handling
- **🎯 Type Safety** - Full TypeScript implementation with strict typing
- **⚡ High Performance** - Built with Bun runtime for optimal speed
- **🔧 Clean Architecture** - Repository pattern with service layer separation
- **📝 Consistent API Responses** - Standardized response formatting middleware
- **🔒 Data Serialization** - Secure user data serialization with password exclusion
- **🌐 Context Management** - User context injection via middleware for easy access
- **🧪 Testing Ready** - Vitest configuration for comprehensive testing

## 🏗️ Architecture

### Project Structure
```
src/
├── models/           # Business logic and data access
│   ├── auth/         # Authentication controllers and services
│   └── user/         # User management controllers, services, and repositories
├── middleware/       # Custom middleware functions
│   ├── auth.middleware.ts      # JWT authentication middleware
│   └── response.middleware.ts  # Response formatting middleware
├── schema/           # Database schemas and validation schemas
├── utils/            # Utility functions (JWT, hashing, formatting)
├── validation/       # Custom validation utilities
├── types/            # TypeScript type definitions
└── db/              # Database configuration and connection
```

### Key Design Patterns

- **Repository Pattern** - Clean separation between data access and business logic
- **Service Layer** - Business logic encapsulation in service classes
- **Middleware Architecture** - Reusable middleware for cross-cutting concerns
- **Dependency Injection** - Loose coupling through dependency injection
- **Error Handling** - Centralized error handling with custom error types

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (latest version)
- PostgreSQL database
- Node.js 18+ (if not using Bun)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hono-api
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Generate database migrations
   bun run db:generate
   
   # Run migrations
   bun run db:migrate
   
   # (Optional) Open Drizzle Studio for database management
   bun run db:studio
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "status_code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Success",
  "status_code": 200,
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "status_code": 400,
  "data": { /* error details */ }
}
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build the application for production |
| `bun run start` | Start production server |
| `bun run db:generate` | Generate database migrations |
| `bun run db:migrate` | Run database migrations |
| `bun run db:studio` | Open Drizzle Studio for database management |
| `bun test` | Run test suite with Vitest |

## 🏛️ Technology Stack

### Core Technologies
- **[Hono](https://hono.dev)** - Ultra-fast web framework for the Edge
- **[Bun](https://bun.sh)** - Fast all-in-one JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript

### Database & ORM
- **[PostgreSQL](https://www.postgresql.org)** - Robust relational database
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe SQL ORM
- **[Neon](https://neon.tech)** - Serverless PostgreSQL (production ready)

### Authentication & Security
- **[JSON Web Tokens (JWT)](https://jwt.io)** - Secure token-based authentication
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing
- **[Zod](https://zod.dev)** - Schema validation

### Development Tools
- **[Vitest](https://vitest.dev)** - Fast unit testing framework
- **[Drizzle Kit](https://kit.drizzle.team)** - Database migration and management
- **ESLint & Prettier** - Code quality and formatting

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds for secure password storage
- **JWT Tokens** - Secure, stateless authentication
- **Input Validation** - Comprehensive request validation with Zod
- **SQL Injection Protection** - Drizzle ORM provides built-in protection
- **Environment Variables** - Sensitive data stored securely
- **Error Handling** - No sensitive information leaked in error responses

## 🔄 Data Serialization

The application implements a comprehensive serialization system to protect sensitive data and ensure consistent API responses:

### Architecture Overview
- **Service Layer Serialization** - Each model has dedicated serialization methods in service classes
- **Schema-Based Validation** - Zod schemas define serialized data structure and validation
- **Automatic Field Exclusion** - Sensitive fields (passwords, tokens) are automatically excluded
- **Type-Safe Transformation** - TypeScript ensures serialized data matches expected schemas

### Implementation Pattern
```typescript
// 1. Define serialization schema (excludes sensitive fields)
export const SerializedModelSchema = createSelectSchema(ModelSchema).omit({ 
  password: true, 
  secretKey: true 
});

// 2. Service layer serialization method
export const ModelService = {
  serialize: (model: Model): TSerializedModel => {
    return SerializedModelSchema.parse(model);
  },
};

// 3. Controller usage
const serializedData = ModelService.serialize(rawData);
return c.json(serializedData);
```

### Benefits
- **Security** - Sensitive data never exposed in API responses
- **Consistency** - Standardized serialization across all endpoints
- **Type Safety** - Compile-time validation of serialized data structure
- **Maintainability** - Centralized serialization logic for easy updates

## 🌐 Context Management

The application implements a sophisticated context management system that automatically injects user data into request handlers:

### User Context Injection
- **Middleware-Based** - Authentication middleware automatically sets user context
- **Automatic Serialization** - User data is serialized before context injection
- **Type-Safe Access** - TypeScript ensures proper context usage
- **Request-Scoped** - Context is available throughout the request lifecycle

### Implementation Pattern
```typescript
// 1. Middleware sets user context
export const authMiddleware = async (c: Context, next: Next) => {
  const decoded = await verifyJwt(token);
  const user = await UserRepository.getById(decoded.id);
  c.set("user", UserService.serialize(user)); // Serialized user context
  await next();
};

// 2. Controllers access user context
UserController.get("/", async (c: Context) => {
  const currentUser = c.get("user"); // Type-safe user access
  console.log("Current user:", currentUser);
  // ... rest of handler
});
```

### Benefits
- **Clean Code** - No need to manually fetch user data in each handler
- **Performance** - User data fetched once per request, not per handler
- **Type Safety** - TypeScript ensures proper context usage
- **Consistency** - All protected routes have access to the same user context
- **Security** - Serialized user data prevents accidental exposure of sensitive fields

## 🧪 Testing

The project is configured with Vitest for comprehensive testing:

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with UI
bun test --ui
```

## 🚀 Deployment

### Production Build
```bash
bun run build
bun run start
```

### Environment Variables for Production
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-production-secret-key
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Development Skills Demonstrated

This project showcases proficiency in:

- **Modern JavaScript/TypeScript** - ES6+ features, async/await, type safety
- **API Design** - RESTful principles, consistent response formats
- **Authentication & Security** - JWT implementation, password hashing, middleware
- **Database Design** - PostgreSQL schema design, ORM usage, migrations
- **Clean Architecture** - Separation of concerns, repository pattern, dependency injection
- **Error Handling** - Centralized error management, custom error types
- **Data Serialization** - Secure data transformation, schema validation, type safety
- **Context Management** - Request-scoped data injection, middleware patterns
- **Testing** - Test configuration and utilities
- **Performance** - Bun runtime, efficient database queries
- **Developer Experience** - Hot reload, database studio, comprehensive tooling

---

**Built with ❤️ using Hono, Bun, and TypeScript**