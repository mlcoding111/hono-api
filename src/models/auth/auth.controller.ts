import { Context, Hono } from "hono";
import { AuthService } from "./auth.service";
import { User } from "../user/user.types";

export const AuthController = new Hono();

/**
 * Register a new user
 * @param c - Context
 * @returns User
 */
AuthController.post('/register', async (c) => {
  const { email, password } = await c.req.json();
  const user = await AuthService.register(email, password);
  return c.json(user as User);
});

/**
 * Login a user
 * @param c - Context
 * @returns User
 */
AuthController.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  const user = await AuthService.login(email, password);
  return c.json(user);
});