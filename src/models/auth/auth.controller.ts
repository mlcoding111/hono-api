import { Context, Hono } from "hono";
import { AuthService } from "./auth.service";
import { zValidator } from "../../validation/validator";
import { RegisterUserSchema } from "../../schema/user.schema";

export const AuthController = new Hono();

/**
 * Register a new user
 * @param c - Context
 * @returns User
 */
AuthController.post('/register', zValidator('json', RegisterUserSchema), async (c: Context) => {
  const { email, password } = c.get('body');
  const user = await AuthService.register(email, password);
  return c.json(user);
});

/**
 * Login a user
 * @param c - Context
 * @returns User
 */
AuthController.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  const token = await AuthService.login(email, password);
  return c.json(token);
});

export default AuthController;