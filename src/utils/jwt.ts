import jwt from 'jsonwebtoken';

export const signJwt = async (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
