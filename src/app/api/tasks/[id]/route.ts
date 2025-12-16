import { NextRequest, NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";
import { requireAuth } from "@/utils/requireAuth";

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
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  const taskId = Number(id);

  if (isNaN(taskId)) {
    return NextResponse.json(
      { message: "ID inválido." },
      { status: 400 }
    );
  }

  const tasksService = new TasksService();
  const deleted = await tasksService.deleteTask(taskId);

  if (!deleted) {
    return NextResponse.json(
      { message: "Task não encontrada!" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Task deletada com sucesso." },
    { status: 200 }
  );
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
  const tasksService = new TasksService();
  const existingTask = await tasksService.getTaskById(taskId);

  if (!existingTask || existingTask.userId !== userId) {
    return NextResponse.json(
      { message: "Task não encontrada ou acesso negado." },
      { status: 404 }
    );
  }

  const updatedTask = await tasksService.updateTask(taskId, {
    title: body.title,
    description: body.description,
    status: body.status,
  });

  return NextResponse.json(
    { task: updatedTask },
    { status: 200 }
  );
}
