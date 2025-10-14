import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    const sql = neon(Bun.env.DATABASE_URL!);
    dbInstance = drizzle(sql);
  }
  return dbInstance;
};

// For backward compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});