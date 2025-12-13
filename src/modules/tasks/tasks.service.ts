import { TasksRepository } from "./tasks.repository";
import { CreateTaskDTO } from "./tasks.types";

export class TasksService{
    private repository = new TasksRepository();

    async createTask(data:CreateTaskDTO){
        const task = await this.repository.createTask(data);
        return task;
    }

}