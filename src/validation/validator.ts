import { zValidator as zv } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodSchema } from "zod";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result: any, c: any) => {
    const { success, error, data } = result;
    
    if (!result.success) {
      const formattedError = error?.flatten().fieldErrors;
      const errorResponse = {
        success: false,
        error: {
          type: 'validation_error',
          message: 'Validation failed',
          fields: formattedError,
          details: error?.issues.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code
          }))
        }
      };
      
      return c.json(errorResponse, 400);
    }
    
    // Store validated data in context for the next handler
    c.set('body', data);
    return c.next();
  });
