import { NextResponse } from "next/server";
import { UsersService } from "@/modules/users/users.service";
import { validatePassword } from "@/utils/password";


export async function POST(request: Request) {
    const userService = new UsersService();
    const body = await request.json();

    const passwordValidator = validatePassword(body.password);
    if (!passwordValidator.isValid) {
        return NextResponse.json({
            message: "Senha invalida.",
            errors: passwordValidator.errors
        }, { status: 400 });
    }

    try{
        const user = await userService.createUser({    
            name: body.name,
            email: body.email,
            password: body.password,
        });
        return NextResponse.json({
            message: "Usuario criado com sucesso.",
            user: { id: user.id, name: user.name, email: user.email }
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            message: "Erro ao criar usuario.",
        }, { status: 500 });
    }
}