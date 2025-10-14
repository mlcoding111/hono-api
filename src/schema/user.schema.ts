import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const UserSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof UserSchema.$inferSelect;

export const RegisterUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});


