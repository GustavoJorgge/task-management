import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/hashPassword";
import { prisma } from "@/modules/infra/prisma";
import { signJwt } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "Usuário ou senha inválidos" }, { status: 401 });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return NextResponse.json({ message: "Usuário ou senha inválidos" }, { status: 401 });

  const token = signJwt({ userId: user.id });

  return NextResponse.json({
    message: "Login realizado com sucesso",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  }, { status: 200 });
}
