import { Context, Hono } from "hono";
import { AuthService } from "./auth.service";
import { zValidator } from "../../validation/validator";
import { RegisterUserSchema } from "../../schema/user.schema";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { HTTPException } from "hono/http-exception";

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
  const { token, user } = await AuthService.login(email, password);

  const serializedUser = UserService.serialize(user);
  return c.json(
    {
      token: token,
      user: serializedUser
    }
  );
});

export default AuthController;