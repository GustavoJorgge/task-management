import { Tasks } from "@prisma/client";
import { CreateTaskDTO } from "./tasks.types";
import { prisma } from "../infra/prisma";


export class TasksRepository {
    async createTask(data: CreateTaskDTO): Promise<Tasks> {
        const task = await prisma.tasks.create({
            data:{
                title: data.title,
                description: data.description,
                userId: data.userId,
            }
        });
        return task;
    }
}