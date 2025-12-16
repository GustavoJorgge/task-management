import { NextRequest, NextResponse } from "next/server";
import { UsersService } from "@/modules/users/users.service";
import { createUserSchema } from "@/modules/users/users.schema";
import { hashPassword } from "@/utils/hashPassword";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const usersService = new UsersService();
    const hashedPassword = await hashPassword(parsed.data.password);

    const user = await usersService.createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno ao criar usuário." },
      { status: 500 }
    );
  }
}
