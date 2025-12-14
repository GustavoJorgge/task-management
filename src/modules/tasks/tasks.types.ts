export type CreateTaskDTO = {
    title: string;
    description: string;
    status?: string;
    userId: number;
};