import { Status } from "@prisma/client";

export type CreateTaskDTO = {
    title: string;
    description: string;
    status?: Status;
    userId: number;
};

export type UpdateTaskDTO = {
    title?: string;
    description?: string;
    status?: Status;
    userId?: number;
    updatedAt?: Date;
};