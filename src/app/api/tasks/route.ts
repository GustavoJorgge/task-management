import { NextRequest, NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);

  if ("error" in auth) {
    return auth.error;
  }

  const { userId } = auth;

  const body = await req.json();
  const tasksService = new TasksService();

  const task = await tasksService.createTask({
    title: body.title,
    description: body.description,
    status: body.status ?? "PENDING",
    userId,
  });

  return NextResponse.json({ task }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const auth = requireAuth(request);

  if ("error" in auth){
    return auth.error;
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID da tarefa é obrigatório." },
      { status: 400 }
    );
  }

  const taskId = Number(id);
  if (isNaN(taskId)) {
    return NextResponse.json(
      { message: "ID da tarefa inválido." },
      { status: 400 }
    );
  }

  const tasksService = new TasksService();

  try {
    const deleted = await tasksService.deleteTask(taskId);

    if (!deleted) {
      return NextResponse.json(
        { message: "Tarefa não encontrada ou não pertence ao usuário." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Erro interno ao deletar tarefa." },
      { status: 500 }
    );
  }
}
