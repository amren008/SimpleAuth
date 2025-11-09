import jwt from "jsonwebtoken";

const JWT_SECRET = (process.env.JWT_SECRET || "fallback-secret") as jwt.Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
};

export const verifyToken = (token: string): { userId: number } => {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
};
