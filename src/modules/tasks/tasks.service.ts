import { TasksRepository } from "./tasks.repository";
import { CreateTaskDTO } from "./tasks.types";

export class TasksService {
  private repository = new TasksRepository();

  //Cria Task
  async createTask(data: CreateTaskDTO) {
    return this.repository.createTask(data);
  }
  //Deleta Task
  async deleteTask(taskId: number): Promise<boolean> {
    
    if(!await this.repository.getTaskById(taskId)){
      return false;
    }

    await this.repository.deleteTask(taskId);
    return true;
  }
  //Busca Task por ID
  async getTaskById(taskId: number) {
    return this.repository.getTaskById(taskId);
  }
  //Busca Tasks por Usuário
  async getTasksByUserId(userId: number) {
    return this.repository.getTasksByUserId(userId);
  }
}
