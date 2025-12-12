import {Users} from "@prisma/client";

export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
};

export type UserEntity = Users;