import { HTTPException } from "hono/http-exception";
import { TErrorResponse, TSuccessResponse } from "../types/response";
import { ZodError } from "zod";
import { ContentfulStatusCode } from "hono/utils/http-status";

export function formatSuccessResponse(data: unknown, message?: string): TSuccessResponse<unknown> {
  return {
    success: true,
    message: message || "Success",
    data,
    status_code: 200,
  };
}

export function formatErrorResponse(error: Error | ZodError | HTTPException, data?: unknown): TErrorResponse<unknown> {
  const isProduction = Bun.env.NODE_ENV === "production";
  
  const errorResponse: TErrorResponse<unknown> = {
    message: error.message || "Internal server error",
    status_code: (error as unknown as { status: ContentfulStatusCode }).status || 500,
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
  const formattedResponse = formatSuccessResponse(data, message);
  return c.json(formattedResponse, statusCode);
}