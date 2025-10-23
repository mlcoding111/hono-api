import { Context, Next } from "hono";

export const loggerMiddleware = async (c: Context, next: Next) => {
  console.log(`[LOG]: ${c.req.method} ${c.req.url}`);
  await next();
  console.log(`[LOG]: Response status: ${c.res.status}`);
};
