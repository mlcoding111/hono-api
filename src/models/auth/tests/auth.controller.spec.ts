import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";
import { app } from "../../../index";
import { expectSuccessResponse } from "../../../utils/test";

describe("AuthController", () => {
  const client = testClient(app) as any;

  it("should register a new user", async () => {
    const uniqueEmail = `test-${Date.now()}@test.com`;
    const response = await client.auth.register.$post({
      json: {
        email: uniqueEmail,
        password: "testpassword123",
      },
    });
    const data = await response.json();
    expectSuccessResponse(data);
  });

  it("should login a user", async () => {
    const response = await client.auth.login.$post({
      json: {
        email: "test@test.com",
        password: "testpassword123",
      },
    });
    const data = await response.json();
    expectSuccessResponse(data);
  });
});
