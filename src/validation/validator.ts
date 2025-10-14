import { zValidator as zv } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodSchema } from "zod";
import { formatErrorResponse } from "../utils/format";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result: any, c: any) => {
    const { success, error, data } = result;

    if (!success) {
      const formattedError = error?.flatten().fieldErrors;
      error.status = 400;
      error.message = "Validation failed";
      const errorResponse = formatErrorResponse(error, formattedError);
      return c.json(errorResponse, 400);
    }

    // Store validated data in context for the next handler
    c.set("body", data);
    // Don't call next() here - let the validator handle the flow
  });
