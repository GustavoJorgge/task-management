import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./jwtToken";

export function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ message: "Token inválido ou expirado" }, { status: 401 });
  }

  return payload;
}
