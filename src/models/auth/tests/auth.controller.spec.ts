import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "bun:test";
import { testClient } from "hono/testing";
import app from "../../../app";
import { expectSuccessResponse } from "../../../utils/test";
import { User } from "../../../schema/user.schema";
import { UserRepository } from "../../user/user.repository";

describe("AuthController", () => {
  const client = testClient(app) as any;

  let testUser: { email: string; password: string } | null = null;
  let createdUserId: number | null = null;

  beforeAll(async () => {
    testUser = {
      email: `test-${Date.now()}@test.com`,
      password: "testpassword123",
    };
  });

  afterAll(async () => {
    console.log("After all", createdUserId);
    if (createdUserId) {
      console.log("Deleting user", createdUserId);
      await UserRepository.delete(createdUserId.toString());
    }
  });

  // beforeEach(async () => {
  //   // Reset state before each test if needed
  //   createdUserId = null;
  // });

  it("should register a new user", async () => {
    const response = await client.auth.register.$post({
      json: {
        email: testUser?.email,
        password: testUser?.password,
      },
    });
    const data = await response.json();
    expectSuccessResponse(data);
    createdUserId = Number(data.data.id);
  });

  it("should login a user", async () => {
    const response = await client.auth.login.$post({
      json: {
        email: testUser?.email,
        password: testUser?.password,
      },
    });
    const data = await response.json();
    expectSuccessResponse(data);
  });
});
