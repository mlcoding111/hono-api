import { Context, Next } from 'hono';
import { formatSuccessResponse } from '../utils/format';

/**
 * Middleware to automatically format successful responses
 * Wraps all successful responses in a consistent format
 */
export const responseMiddleware = async (c: Context, next: Next) => {
  // Call next() first to let the route handler execute
  await next();
  
  // Only format successful responses (2xx status codes)
  if (c.res.status >= 200 && c.res.status < 300) {
    // Skip if response is already formatted or is a special response type
    const contentType = c.res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      try {
        const body = await c.res.clone().json();
        console.log('Response body:', body);
        
        // Check if response is already formatted (has success field)
        if (body && typeof body === 'object' && 'success' in body) {
          return; // Already formatted, don't double-wrap
        }
        
        // Format the response
        const formattedResponse = formatSuccessResponse(body);
        console.log('Formatted response:', formattedResponse);
        
        // Override the response
        c.res = new Response(JSON.stringify(formattedResponse), {
          status: c.res.status,
          headers: {
            'content-type': 'application/json',
          },
        });
        return;
      } catch (error) {
        // If we can't parse the response, leave it as is
        console.log('Error parsing response:', error);
        return;
      }
    }
  }
};
