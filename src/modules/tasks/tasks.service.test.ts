import { describe, it, expect, vi, beforeEach } from "vitest";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { Tasks } from "@prisma/client";

vi.mock("./tasks.repository");

describe("TasksService", () => {
  let service: TasksService;
  let repositoryMock: ReturnType<typeof vi.mocked<TasksRepository>>;

  beforeEach(() => {
    repositoryMock = vi.mocked(TasksRepository.prototype);
    service = new TasksService();
  });

  it("deve criar uma task com sucesso", async () => {
    const mockTask: Tasks = {
      id: 1,
      title: "Test Task",
      description: "Descrição",
      status: "PENDING",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.createTask.mockResolvedValue(mockTask);

    const result = await service.createTask({
      title: "Test Task",
      description: "Descrição",
      userId: 1,
    });

    expect(result).toEqual(mockTask);
    expect(repositoryMock.createTask).toHaveBeenCalledOnce();
  });

    it("deve deletar uma task", async () => {
    const mockTask: Tasks = {
      id: 1,
      title: "Task",
      description: "Desc",
      status: "PENDING",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.deleteTask.mockResolvedValue(mockTask);

    const result = await service.deleteTask(1);

    expect(result).toEqual(mockTask);
    expect(repositoryMock.deleteTask).toHaveBeenCalledWith(1);
  });
  
});
