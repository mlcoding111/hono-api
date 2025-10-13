import { sign } from 'hono/jwt';

export async function signJwt(payload: any) {
  return await sign(payload, process.env.JWT_SECRET!);
}