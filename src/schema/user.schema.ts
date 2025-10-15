import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const UserSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof UserSchema.$inferSelect;

// Drizzle-zod schemas. Simple take main schema, anc pick email, password
export const RegisterUserSchema = createInsertSchema(UserSchema, {
  email: z.email(),
  password: z.string().min(8),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
});

export const LoginUserSchema = createInsertSchema(UserSchema, {
  email: z.email(),
  password: z.string().min(8),
});

export const SerializedUserSchema = createSelectSchema(UserSchema).omit({ password: true });

// Type for serialized user
export type TSerializedUser = z.infer<typeof SerializedUserSchema>;