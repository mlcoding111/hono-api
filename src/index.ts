import { Hono } from "hono";
import { UserController } from "./models/user/user.controller";
import { AuthController } from "./models/auth/auth.controller";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.route("/auth", AuthController);
app.route("/users", UserController);

app.get("/", (c) => c.text("Hono JWT Auth API running ✅"));

const port = Number(Bun.env.PORT) || 3000;

console.log(`Server is running on port ${port}`);

app.onError((err, c) => {
  const isProduction = Bun.env.NODE_ENV === "production";
  const url = c.req.url;

  // console.log('Error on', url, err);
  // console.error(`Error on ${url}:`, err);  
  
  const errorResponse = {
    message: err.message || "Internal server error",
    status: err instanceof HTTPException ? err.status : 500,
    success: false,
    ...(isProduction ? {} : { stack: err.stack }),
  };

  return c.json(errorResponse, 500);
});

export default {
  port,
  fetch: app.fetch,
};
