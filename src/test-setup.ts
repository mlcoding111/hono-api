// Test setup file for Bun/Vitest
// This file is preloaded before running tests

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.DATABASE_URL = 'postgresql://devuser:devpass@localhost:5433/devdb';

// Add any global test setup here
console.log('Test setup loaded');
