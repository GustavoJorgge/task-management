import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_SECRET = "G7r$9kL!2vQwX#8p";
const EXPIRES_IN = "1h";

if (!JWT_SECRET) { 
    throw new Error("JWT_SECRET não está definido");
}

export interface JwtPayload {
    userId: number;
}

export function signJwt(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        return payload;
    } catch (error) {
        return null;
    }
}