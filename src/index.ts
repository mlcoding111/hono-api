import dotenv from "dotenv";

dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { UserController } from "./models/user/user.controller";
import { AuthController } from "./models/auth/auth.controller";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.route("/auth", AuthController);
app.route("/user", UserController);

app.get("/", (c) => c.text("Hono JWT Auth API running ✅"));

const port = Number(process.env.PORT) || 3000;

console.log(`Server is running on port ${port}`);

app.onError((err, c) => {
  const isProduction = process.env.NODE_ENV === "production";
  const url = c.req.url;

  console.log('Error on', url, err);
  console.error(`Error on ${url}:`, err);  
  
  const errorResponse = {
    message: err.message || "Internal server error",
    status: err instanceof HTTPException ? err.status : 500,
    success: false,
    ...(isProduction ? {} : { stack: err.stack }),
  };

  return c.json(errorResponse, 500);
});

serve({
  fetch: app.fetch,
  port,
});
