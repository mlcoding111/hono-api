import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let dbInstance: ReturnType<typeof drizzle> | ReturnType<typeof drizzlePg> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    console.log('DATABASE_URL:', Bun.env.DATABASE_URL);
    console.log('NODE_ENV:', Bun.env.NODE_ENV);
    
    const databaseUrl = Bun.env.DATABASE_URL!;
    
    // Use Neon for production, PostgreSQL for development
    if (Bun.env.NODE_ENV === 'production') {
      const sql = neon(databaseUrl);
      dbInstance = drizzle(sql);
    } else {
      // Development - use local PostgreSQL
      const sql = postgres(databaseUrl);
      dbInstance = drizzlePg(sql);
    }
  }
  return dbInstance;
};

// For backward compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});