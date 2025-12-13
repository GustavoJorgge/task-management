import { TasksRepository } from "./tasks.repository";
import { CreateTaskDTO } from "./tasks.types";

export class TasksService {
  private repository = new TasksRepository();

  async createTask(data: CreateTaskDTO) {
    return this.repository.createTask(data);
  }

  async deleteTask(taskId: number): Promise<boolean> {
    const task = await this.repository.deleteTask(taskId);

    if (!task) {
      return false;
    }

    await this.repository.deleteTask(taskId);
    return true;
  }

  async getTaskById(taskId: number) {
    return this.repository.getTaskById(taskId);
  }
}
