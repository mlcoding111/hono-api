import { Context, Next } from "hono";
import { UserRepository } from "./user.repository";
import { Hono } from "hono";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UserService } from "./user.service";

export const UserController = new Hono();

UserController.use("*", authMiddleware);

/**
 * Get all users
 * @param c - Context
 * @returns User[]
 */
UserController.get("/", async (c: Context) => {
  console.log(c.get("user"));
  const users = await UserRepository.findMany();
  const serializedUsers = users.map(UserService.serialize);
  return c.json(serializedUsers);
});

/**
 * Create a new user
 * @param c - Context
 * @returns User
 */
UserController.post("/", async (c: Context) => {
  const { email, password } = await c.req.json();

  const user = await UserRepository.create(email, password);
  const serializedUser = UserService.serialize(user);
  return c.json(serializedUser);
});

/**
 * Get a user by id
 * @param c - Context
 * @returns User
 */
UserController.get("/:id", async (c: Context) => {
  const { id } = c.req.param();
  const user = await UserRepository.getById(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  const serializedUser = UserService.serialize(user);
  return c.json(serializedUser);
});

/**
 * Update a user
 * @param c - Context
 * @returns User
 */
UserController.put("/:id", async (c: Context) => {
  const { id } = c.req.param();
  const { email, password } = await c.req.json();
  const user = await UserRepository.update(id, email, password);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  const serializedUser = UserService.serialize(user);
  return c.json(serializedUser);
});

/**
 * Delete a user
 * @param c - Context
 * @returns User
 */
UserController.delete("/:id", async (c: Context) => {
  const { id } = c.req.param();
  const user = await UserRepository.delete(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  const serializedUser = UserService.serialize(user);

  return c.json(serializedUser);
});
