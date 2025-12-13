//quero criar a rota que cria uma tarefa
import { NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";

export async function POST(request: Request) {
    const tasksService = new TasksService();
    const body = await request.json();
    try {
        const task = await tasksService.createTask({
            title: body.title,
            description: body.description,
            status: body.status,
            userId: body.userId,
        });
        return NextResponse.json({
            task,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({
            message: "Erro ao criar tarefa.",
        }, { status: 500 });
    }
}