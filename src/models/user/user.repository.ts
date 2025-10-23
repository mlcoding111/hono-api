import { db } from "../../db";
import { UserSchema } from "../../schema/user.schema";
import { eq } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof UserSchema>;

export const UserRepository = {
  /**
   * Create a new user
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<User> - The created user object
   */
  create: async (email: string, password: string): Promise<User> => {
    const user = await db.insert(UserSchema).values({ email, password, first_name: '', last_name: '' }).returning();
    return user[0];
  },

  /**
   * Get all users
   * @returns Promise<User[]> - The list of all users
   */
  findMany: async (): Promise<User[]> => {
    const allUsers = await db.select().from(UserSchema);
    return allUsers;
  },

  /**
   * Get a user by email
   * @param email - User's email address
   * @returns Promise<User | null> - The user object or null if not found
   */
  getByEmail: async (email: string): Promise<User | null> => {
    const user = await db.select().from(UserSchema).where(eq(UserSchema.email, email));
    return user[0] || null;
  },

  /**
   * Get a user by id
   * @param id - User's unique identifier
   * @returns Promise<User | null> - The user object or null if not found
   */
  getById: async (id: string): Promise<User | null> => {
    const user = await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.id, Number(id)));
    return user[0] || null;
  },

  /**
   * Update a user
   * @param id - User's unique identifier
   * @param email - New email address
   * @param password - New password
   * @returns Promise<User> - The updated user object
   */
  update: async (
    id: string,
    email: string,
    password: string
  ): Promise<User> => {
    const user = await db
      .update(UserSchema)
      .set({ email, password })
      .where(eq(UserSchema.id, Number(id)))
      .returning();
    return user[0];
  },

  /**
   * Delete a user
   * @param id - User's unique identifier
   * @returns Promise<User> - The deleted user object
   */
  delete: async (id: string): Promise<User> => {
    const user = await db
      .delete(UserSchema)
      .where(eq(UserSchema.id, Number(id)))
      .returning();
    return user[0];
  },
};

