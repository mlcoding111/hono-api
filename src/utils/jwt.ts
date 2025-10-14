import { sign, verify } from 'hono/jwt';

export async function signJwt(payload: any) {
  return await sign(payload, process.env.JWT_SECRET!);
}

export async function verifyJwt(token: string) {
  return await verify(token, process.env.JWT_SECRET!);
}