import { Tasks } from "@prisma/client";
import { TasksRepository } from "./tasks.repository";
import { CreateTaskDTO, UpdateTaskDTO } from "./tasks.types";

export class TasksService {
  constructor(
    private repository: TasksRepository = new TasksRepository()
  ) {}

  //Cria Task
  async createTask(data: CreateTaskDTO) {
    return this.repository.createTask(data);
  }
  //Deleta Task
  async deleteTask(id: number): Promise<Tasks | null> {
    return this.repository.deleteTask(id);
  }
  //Busca Task por ID
  async getTaskById(taskId: number) {
    return this.repository.getTaskById(taskId);
  }
  //Busca Tasks por Usuário
  async getTasksByUserId(userId: number) {
    return this.repository.getTasksByUserId(userId);
  }
  //Atualiza Task
  async updateTask(id: number, data: UpdateTaskDTO) {
    return this.repository.updateTask(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
