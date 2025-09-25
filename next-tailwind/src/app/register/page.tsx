"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "../SchemaZod";

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterSchemaType) => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/login";
    };

    const ErrorMessage = ({ name }: { name: keyof RegisterSchemaType }) =>
        errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]?.message}</p>;

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="p-10 rounded-2xl shadow-lg border border-zinc-200 bg-white space-y-8 w-[90%] max-w-md">
                <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
                    <img src="/favicon.ico" alt="Icon Task" className="h-10" />
                    Mini-Trello
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="fullname" className="text-sm font-medium text-gray-600">
                            Nome
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            {...register("fullname")}
                            className={`input-style ${errors.fullname ? "border-red-500" : ""}`}
                        />
                        <ErrorMessage name="fullname" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email")}
                            className={`input-style ${errors.email ? "border-red-500" : ""}`}
                        />
                        <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cpf" className="text-sm font-medium text-gray-600">
                            CPF
                        </label>
                        <input
                            type="number"
                            placeholder="Digite seu CPF (apenas números)"
                            {...register("cpf")}
                            className={`input-style ${errors.cpf ? "border-red-500" : ""}`}
                        />
                        <ErrorMessage name="cpf" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("password")}
                            className={`input-style ${errors.password ? "border-red-500" : ""}`}
                        />
                        <ErrorMessage name="password" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            {...register("confirmPassword")}
                            className={`input-style ${errors.confirmPassword ? "border-red-500" : ""}`}
                        />
                        <ErrorMessage name="confirmPassword" />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md font-medium transition duration-200"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </section>
    );
}
