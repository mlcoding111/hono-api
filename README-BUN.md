# Hono API - Bun Refactoring

This project has been refactored from Node.js to Bun for improved performance and developer experience.

## Key Changes Made

### 1. Package.json Updates
- Removed Node.js specific dependencies (`@hono/node-server`, `dotenv`, `tsx`)
- Updated scripts to use Bun commands
- Added `bun-types` for TypeScript support

### 2. TypeScript Configuration
- Changed `moduleResolution` from "Node" to "Bundler"
- Added `bun-types` to types array
- Optimized for Bun's bundler

### 3. Server Implementation
- Replaced `@hono/node-server` with Bun's native server
- Removed `dotenv` dependency (Bun has built-in env support)
- Updated environment variable access to use `Bun.env`

### 4. Environment Variables
- Replaced `process.env` with `Bun.env` throughout the codebase
- Removed `dotenv.config()` calls
- Bun automatically loads `.env` files

### 5. Database Connection
- Updated to use `Bun.env.DATABASE_URL`
- Maintained lazy loading for better performance

## Installation & Setup

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Run database migrations**:
   ```bash
   bun run db:migrate
   ```

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build the application for production
- `bun run start` - Start production server
- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
NODE_ENV=development
```

## Performance Benefits

- **Faster startup time**: Bun starts significantly faster than Node.js
- **Better memory usage**: More efficient memory management
- **Built-in bundler**: No need for external bundling tools
- **Native TypeScript support**: No need for tsx or ts-node
- **Faster package installation**: Bun's package manager is faster than npm

## Development

Start the development server:
```bash
bun run dev
```

The server will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /users` - Get all users (protected)
- `POST /users` - Create user (protected)
- `GET /users/:id` - Get user by ID (protected)
- `PUT /users/:id` - Update user (protected)
- `DELETE /users/:id` - Delete user (protected)

## Migration from Node.js

The refactoring maintains the same API structure and functionality while leveraging Bun's performance improvements. All existing functionality remains intact.
