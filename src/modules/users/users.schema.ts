import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  email: z
    .string()
    .email("E-mail inválido"),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter ao menos um número")
    .regex(/[^A-Za-z0-9]/, "Senha deve conter um caractere especial"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
