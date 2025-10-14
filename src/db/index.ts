import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

type DbInstance = ReturnType<typeof drizzle> | ReturnType<typeof drizzlePg>;

let dbInstance: DbInstance | null = null;

export const getDb = (): DbInstance => {
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
export const db = new Proxy({} as DbInstance, {
  get(target, prop) {
    const db = getDb();
    return (db as any)[prop];
  }
});