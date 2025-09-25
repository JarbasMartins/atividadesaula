import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Formato de e-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const cpfSchema = z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
        message: "O CPF deve conter exatamente 11 dígitos numéricos.",
    });

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(5, "O nome deve ter pelo mneos 5 caracteres.")
            .max(15, "O tamanho máximo do nome de usuário são 15 caracteres."),
        fullname: z.string().min(10, "O nome completo deve ter pelo menos 10 caracteres.").max(100),
        email: z.email({ message: "O e-mail deve ser válido." }),
        cpf: cpfSchema,
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
        confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
