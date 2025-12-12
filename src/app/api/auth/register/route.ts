import { NextResponse } from "next/server";
import { UsersService } from "@/modules/users/users.service";

const userService = new UsersService();

export async function POST(request: Request) {

    const body = await request.json();
    const user = await userService.createUser({
        name: body.name,
        email: body.email,
        password: body.password,
    });
    
    return NextResponse.json({
        message: "Usuario criado com sucesso.",
        user: { id: user.id, name: user.name, email: user.email }
    }, { status: 201 });
}