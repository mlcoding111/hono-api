import { expect } from "bun:test";

const expectSuccessResponse = (data: any, statusCode: number = 200) => {
  expect(data).toHaveProperty("success", true);
  expect(data).toHaveProperty("data");
  expect(data).toHaveProperty("message");
  expect(data).toHaveProperty("status_code", statusCode);
};

export { expectSuccessResponse };
