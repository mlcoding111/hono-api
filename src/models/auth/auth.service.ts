
import { HTTPException } from "hono/http-exception";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { signJwt } from "../../utils/jwt";
import { UserRepository } from "../user/user.repository";

export const AuthService = {
  /**
   * Register a new user
   * @param email - User's email address
   * @param password - User's password
   * @returns User
   */
  register: async (email: string, password: string) => {
    const existing = await UserRepository.getByEmail(email);
    if (existing) throw new HTTPException(400, { message: "User already exists" });
    const hashed = await hashPassword(password);
    const user = await UserRepository.create(email, hashed);
    return user;
  },

  /**
   * Login a user
   * @param email - User's email address
   * @param password - User's password
   * @returns User
   */
  login: async (email: string, password: string) => {
    const user = await UserRepository.getByEmail(email);
    if (!user) throw new HTTPException(401, { message: "Invalid credentials" });

    const valid = await verifyPassword(password, user.password);
    if (!valid) throw new HTTPException(401, { message: "Invalid credentials" });

    const token = await signJwt({ id: user.id, email: user.email });
    return { token };
  },
};
