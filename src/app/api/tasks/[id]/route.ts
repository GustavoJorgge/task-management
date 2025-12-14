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
