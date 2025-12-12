import {prisma} from "@/modules/infra/prisma";
import {CreateUserDTO, UserEntity} from "@/modules/users/users.types";

export class UsersRepository {
    async create(data: CreateUserDTO): Promise<UserEntity> {
        const user = await prisma.users.create({
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        console.log('Created user:', user);
        return user;
    }
}