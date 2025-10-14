import { HTTPException } from "hono/http-exception";
import { TErrorResponse, TSuccessResponse } from "../types/response";
import { ZodError } from "zod";

export function formarSuccessResponse(data: unknown, message?: string): TSuccessResponse<unknown> {
  return {
    success: true,
    data,
    message: message || "Success",
    status_code: 200,
  };
}

export function formatErrorResponse(error: Error | ZodError, data?: unknown): TErrorResponse<unknown> {
  const isProduction = Bun.env.NODE_ENV === "production";
  
  const errorResponse: TErrorResponse<unknown> = {
    message: error.message || "Internal server error",
    status_code: error instanceof HTTPException ? error.status : 500,
    success: false,
    data: data || {},
    ...(isProduction ? {} : { stack: error.stack }),
  };

  return errorResponse;
}

/**
 * Helper function to send a formatted success response
 * @param c - Hono Context
 * @param data - Data to return
 * @param message - Optional success message
 * @param statusCode - HTTP status code (default: 200)
 */
export function sendSuccessResponse<T>(
  c: any, 
  data: T, 
  message?: string, 
  statusCode: number = 200
) {
  const formattedResponse = formarSuccessResponse(data, message);
  return c.json(formattedResponse, statusCode);
}