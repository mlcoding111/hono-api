import { ContentfulStatusCode } from "hono/utils/http-status";

export type TResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  status_code: ContentfulStatusCode;
};

export type TErrorResponse<T> = TResponse<T> & {
  success: false;
};

export type TSuccessResponse<T> = TResponse<T> & {
  success: true;
  data: T;
  status_code: 200;
};