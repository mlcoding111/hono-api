import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  define: {
    // Mock Bun globals for testing
    'globalThis.Bun': 'undefined',
  },
  // Provide Bun environment variables
  env: {
    PORT: '3000',
  },
})
