import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/shcema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
  },
});
