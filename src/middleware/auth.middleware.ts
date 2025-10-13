import { Context, Next } from 'hono';
import { verifyJwt } from '../utils/jwt';

/**
 * Middleware: Protects routes that require authentication.
 * - Verifies JWT from Authorization header.
 * - Attaches decoded payload to the context.
 * - Returns 401 if invalid or missing token.
 */
export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid Authorization header' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyJwt(token);
    // Attach payload to context so controllers can access it
    c.set('user', decoded);
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
};
