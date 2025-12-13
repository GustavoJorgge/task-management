import { NextRequest, NextResponse } from "next/server";
import { TasksService } from "@/modules/tasks/tasks.service";

export async function POST(request: Request) {
    const tasksService = new TasksService();
    const body = await request.json();

    if (!body.title) {
        return NextResponse.json(
            { message: "O campo 'title' é obrigatório." }, 
            { status: 400 }
        );
    }

    if (!body.description) {
        return NextResponse.json(
            { message: "O campo 'description' é obrigatório." }, 
            { status: 400 }
        );
    }

    try {
        const task = await tasksService.createTask({
            title: body.title,
            description: body.description,
            status: body.status || "PENDING",
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

export async function DELETE(request: NextRequest) {
    const tasksService = new TasksService();
    
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { message: "O ID da tarefa é obrigatório para a exclusão." },
            { status: 400 }
        );
    }
    
    const taskId = parseInt(id);
    if (isNaN(taskId)) {
         return NextResponse.json(
            { message: "O ID da tarefa deve ser um número válido." },
            { status: 400 }
        );
    }

    try {        
        const deleted = await tasksService.deleteTask(taskId); 
        
        if (!deleted) {
             return NextResponse.json(
                { message: `Tarefa com ID ${taskId} não encontrada.` },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            message: `Tarefa com ID ${taskId} deletada com sucesso.` 
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            message: "Erro interno ao deletar tarefa.",
        }, { status: 500 });
    }
}