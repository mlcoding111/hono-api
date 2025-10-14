import { Context, Next } from 'hono';
import { formarSuccessResponse } from '../utils/format';
import { ContentfulStatusCode } from 'hono/utils/http-status';

/**
 * Middleware to automatically format successful responses
 * Wraps all successful responses in a consistent format
 */
export const responseMiddleware = async (c: Context, next: Next) => {
  await next();
  
  // Only format successful responses (2xx status codes)
  if (c.res.status >= 200 && c.res.status < 300) {
    // Skip if response is already formatted or is a special response type
    const contentType = c.res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      try {
        const body = await c.res.clone().json();
        console.log(body);
        // Check if response is already formatted (has success field)
        if (body && typeof body === 'object' && 'success' in body) {
          return; // Already formatted, don't double-wrap
        }
        
        // Format the response
        const formattedResponse = formarSuccessResponse(body);
        console.log(formattedResponse);
        return c.json(formattedResponse, c.res.status as ContentfulStatusCode);
      } catch (error) {
        // If we can't parse the response, leave it as is
        return;
      }
    }
  }
};
