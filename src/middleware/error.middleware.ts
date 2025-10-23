import { Context, Next } from "hono";
import { formatErrorResponse } from "../utils/format";

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error(`[ERROR]: ${err}`);
    c.status(500);
    c.json(formatErrorResponse(err as Error), 500);
  }
};
