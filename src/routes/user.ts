import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

export const userRoute = new Hono();

userRoute.use('*', jwt({ secret: process.env.JWT_SECRET! }));

userRoute.get('/profile', (c) => {
  const user = c.get('jwtPayload');
  return c.json({ message: 'Welcome back!', user });
});