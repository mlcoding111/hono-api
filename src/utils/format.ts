import { HTTPException } from "hono/http-exception";
import { TErrorResponse } from "../types/response";

export function formarSuccessResponse(data: unknown, message?: string) {
  return {
    success: true,
    data,
    message: message || "Success",
    status_code: 200,
  };
}

export function formatErrorResponse(error: Error): TErrorResponse<unknown> {
  const isProduction = Bun.env.NODE_ENV === "production";
  
  const errorResponse: TErrorResponse<unknown> = {
    message: error.message || "Internal server error",
    status_code: error instanceof HTTPException ? error.status : 500,
    success: false,
    data: {},
    ...(isProduction ? {} : { stack: error.stack }),
  };

  return errorResponse;
}