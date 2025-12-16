import { NextRequest, NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";
import { requireAuth } from "@/utils/requireAuth";
import { updateTaskSchema } from "@/modules/tasks/tasks.schema";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  const taskId = Number(id);

  if (isNaN(taskId)) {
    return NextResponse.json(
      { message: "ID da Task inválida!" },
      { status: 400 }
    );
  }

  const tasksService = new TasksService();
  const task = await tasksService.getTaskById(taskId);

  if (!task) {
    return NextResponse.json(
      { message: "Task não encontrada!" },
      { status: 404 }
    );
  }

  return NextResponse.json({ task });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req);
    if ("error" in auth) return auth.error;

    const { id } = await context.params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "ID da task inválido." },
        { status: 400 }
      );
    }

    const tasksService = new TasksService();
    const existingTask = await tasksService.getTaskById(taskId);

    if (!existingTask) {
      return NextResponse.json(
        { message: "Task não encontrada ou acesso negado." },
        { status: 404 }
      );
    }

    await tasksService.deleteTask(taskId);

    return NextResponse.json(
      { message: "Task deletada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar task:", error);
    return NextResponse.json(
      { message: "Erro interno ao deletar task." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req);
    if ("error" in auth) return auth.error;

    const { userId } = auth;
    const { id } = await context.params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "ID da task inválido." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateTaskSchema.parse(body);

    const tasksService = new TasksService();
    const existingTask = await tasksService.getTaskById(taskId);

    if (!existingTask) {
      return NextResponse.json(
        { message: "Task não encontrada ou acesso negado." },
        { status: 404 }
      );
    }

    const updatedTask = await tasksService.updateTask(taskId, data);

    return NextResponse.json(
      { task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Dados inválidos.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("Erro ao atualizar task:", error);

    return NextResponse.json(
      { message: "Erro interno ao atualizar task." },
      { status: 500 }
    );
  }
}
