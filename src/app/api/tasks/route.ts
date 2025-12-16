import { NextRequest, NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";
import { requireAuth } from "@/utils/requireAuth";
import { createTaskSchema } from "@/modules/tasks/tasks.schema";

export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if ("error" in auth) return auth.error;

    const { userId } = auth;
    const body = await req.json();

    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const tasksService = new TasksService();

    const task = await tasksService.createTask({
      ...parsed.data,
      status: parsed.data.status ?? "PENDING",
      userId,
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    return NextResponse.json(
      { message: "Erro interno ao criar task." },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const { userId } = auth;

  const tasksService = new TasksService();
  const tasks = await tasksService.getTasksByUserId(userId);

  return NextResponse.json({ tasks }, { status: 200 });
}