import { Hono } from 'hono'

export const authRoute = new Hono();

authRoute.get('/login', (c) => {
  return c.text('Login')
})