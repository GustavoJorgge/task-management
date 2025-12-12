import { NextResponse } from "next/server";
import { UsersService } from "@/modules/users/users.service";

const userService = new UsersService();

export async function POST(request: Request) {
            console.log('Created user:', request);

    const body = await request.json();
    const user = await userService.createUser({
        name: body.name,
        email: body.email,
        password: body.password,
    });

    console.log(user)
    return NextResponse.json(user);
}