import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(1, "Insira uma senha válida"),
});

export type FormData = z.infer<typeof loginFormSchema>;
