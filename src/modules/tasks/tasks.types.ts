import { Tasks } from "@prisma/client";

export type CreateTaskDTO = {
    title: string;
    description: string;
    status?: string;
    userId: number;
};