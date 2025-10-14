#!/usr/bin/env bun

// Simple test script to verify Bun refactoring works
console.log('🧪 Testing Bun refactoring...\n');

// Test 1: Environment variables
console.log('1. Testing environment variables:');
console.log('   DATABASE_URL:', Bun.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
console.log('   JWT_SECRET:', Bun.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('   PORT:', Bun.env.PORT || '3000 (default)');

// Test 2: Import the app
console.log('\n2. Testing app import:');
try {
  const app = await import('./src/index.ts');
  console.log('   ✅ App imported successfully');
  console.log('   ✅ Port:', app.default.port);
} catch (error) {
  console.log('   ❌ App import failed:', error.message);
}

// Test 3: Database connection
console.log('\n3. Testing database connection:');
try {
  const { getDb } = await import('./src/db/index.ts');
  const db = getDb();
  console.log('   ✅ Database connection created');
} catch (error) {
  console.log('   ❌ Database connection failed:', error.message);
}

console.log('\n🎉 Bun refactoring test completed!');
