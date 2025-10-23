import { Hono } from "hono";
import { UserController } from "./models/user/user.controller";
import { AuthController } from "./models/auth/auth.controller";
import { formatErrorResponse } from "./utils/format";
import { responseMiddleware } from "./middleware/response.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { secureHeaders } from "hono/secure-headers";
import { rateLimiterMiddleware } from "./middleware/ratelimiter.middleware";

export const app = new Hono();

/**
 * Apply response formatting middleware globally
 */
app.use("*", loggerMiddleware);
app.use("*", rateLimiterMiddleware);
app.use("*", secureHeaders());
app.use("*", responseMiddleware);

/**
 * Routes
 */
app.route("/auth", AuthController);
app.route("/users", UserController);

/**
 * Root route
 */
app.get("/", (c) => c.text("Hono JWT Auth API running ✅"));

/**
 * Port
 */
const port = Number(process.env.PORT) || 3000;

/**
 * Log server running
 */
console.log(`Server is running on port ${port}`);

/**
 * Error handler for errors thrown in the application
 */
app.onError((err, c) => {
  const formattedError = formatErrorResponse(err);

  return c.json(formattedError, formattedError.status_code);
});

export default {
  port,
  fetch: app.fetch,
};
