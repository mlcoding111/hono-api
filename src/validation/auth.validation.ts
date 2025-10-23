import { z } from "zod";
import { validateJson } from "./validator";
import { LoginUserSchema, RegisterUserSchema, ResetPasswordSchema, ChangePasswordSchema } from "../schema/user.schema";

// Auth-specific validation schemas
export const AuthValidation = {
  // Register validation
  register: validateJson(RegisterUserSchema),

  // Login validation
  login: validateJson(LoginUserSchema),

  // Password reset validation
  resetPassword: validateJson(ResetPasswordSchema),

  // Change password validation
  changePassword: validateJson(ChangePasswordSchema),
} as const;

// Export types for better type safety
export type RegisterData = {
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ResetPasswordData = {
  email: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};
