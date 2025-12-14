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


export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const { userId } = auth;

  const tasksService = new TasksService();
  const tasks = await tasksService.getTasksByUserId(userId);

  return NextResponse.json({ tasks }, { status: 200 });
}