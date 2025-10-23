import { zValidator as zv } from "@hono/zod-validator";
import { ValidationTargets, Context } from "hono";
import { ZodSchema } from "zod";
import { formatErrorResponse } from "../utils/format";

// Enhanced zValidator with better type safety and structure
export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result: any, c: Context) => {
    const { success, error, data } = result;

    if (!success) {
      const formattedError = error?.flatten().fieldErrors;
      const errorResponse = formatErrorResponse(error, formattedError);
      return c.json(errorResponse, 400);
    }

    // Store validated data in context for the next handler
    c.set("validatedData", data);
    // Don't call next() here - let the validator handle the flow
  });

// Helper function to get validated data with proper typing
export const getValidatedData = <T>(c: Context): T => {
  return c.get("validatedData") as T;
};

// Specific validators for common use cases
export const validateJson = <T extends ZodSchema>(schema: T) => 
  zValidator("json", schema);

export const validateQuery = <T extends ZodSchema>(schema: T) => 
  zValidator("query", schema);

export const validateForm = <T extends ZodSchema>(schema: T) => 
  zValidator("form", schema);
