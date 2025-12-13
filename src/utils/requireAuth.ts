import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwtToken";

export function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { message: "Token não fornecido." },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyJwt(token);

  if (!payload || !payload.userId) {
    return {
      error: NextResponse.json(
        { message: "Token inválido ou expirado." },
        { status: 401 }
      ),
    };
  }

  return { userId: payload.userId };
}
