import { Context, Hono } from "hono";
import { AuthService } from "./auth.service";
import { getValidatedData } from "../../validation/validator";
import { AuthValidation, RegisterData, LoginData } from "../../validation/auth.validation";
import { UserService } from "../user/user.service";

export const AuthController = new Hono();

/**
 * Register a new user
 * @param c - Context
 * @returns User
 */
AuthController.post('/register', AuthValidation.register, async (c: Context) => {
  const { email, password } = getValidatedData<RegisterData>(c);
  const user = await AuthService.register(email, password);
  return c.json(user);
});

/**
 * Login a user
 * @param c - Context
 * @returns User
 */
AuthController.post('/login', AuthValidation.login, async (c: Context) => {
  const { email, password } = getValidatedData<LoginData>(c);
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