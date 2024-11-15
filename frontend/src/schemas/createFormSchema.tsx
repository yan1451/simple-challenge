import { z } from "zod";

export const createFormSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string().min(1, "Confirme a senha")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type FormData = z.infer<typeof createFormSchema>;
