import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

export interface JwtPayload {
  userId: number;
}

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}
