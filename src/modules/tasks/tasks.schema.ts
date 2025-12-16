import { z } from "zod";
import { Status } from "@prisma/client";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100, "Título muito longo"),
  description: z
    .string()
    .min(5, "Descrição deve ter no mínimo 5 caracteres"),
  status: z.nativeEnum(Status).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z
  .object({
    title: z.string().min(3).max(80),
    description: z.string().min(3).max(500),
    status: z.nativeEnum(Status).optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.status !== undefined,
    {
      message: "Informe ao menos um campo para atualização",
    }
  );

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
