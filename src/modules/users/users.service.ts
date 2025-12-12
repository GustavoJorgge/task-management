import { UsersRepository } from "./users.repository";
import {CreateUserDTO} from "@/modules/users/users.types";

export class UsersService {
    private repository = new UsersRepository();

    async createUser(data: CreateUserDTO) {
        const user = await this.repository.create(data);
        return user;
    }
}