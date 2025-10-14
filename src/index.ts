import { Hono } from "hono";
import { UserController } from "./models/user/user.controller";
import { AuthController } from "./models/auth/auth.controller";
import { formatErrorResponse } from "./utils/format";
import { responseMiddleware } from "./middleware/response.middleware";

const app = new Hono();

/**
 * Apply response formatting middleware globally
 */
app.use('*', responseMiddleware);

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
const port = Number(Bun.env.PORT) || 3000;

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
