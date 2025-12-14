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

    async deleteTask(id: number): Promise<Tasks | null> {
        const task = await prisma.tasks.delete({
            where: { id }
        });
        return task;
    }

    async getTaskById(id: number): Promise<Tasks | null> {
        const task = await prisma.tasks.findUnique({
            where: { id }
        });
        return task;
    }

    async getTasksByUserId(userId: number): Promise<Tasks[]> {
        const tasks = await prisma.tasks.findMany({
            where: { userId }
        });
        return tasks;
    }

}