"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../SchemaZod";
import Link from "next/link";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const ErrorMessage = ({ name }: { name: keyof LoginSchemaType }) =>
        errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]?.message}</p>;

    const onSubmit = (data: LoginSchemaType) => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) return;

        const parsedUser = JSON.parse(savedUser);

        if (parsedUser.email === data.email && parsedUser.password === data.password) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/";
        } else {
            setError("password", { type: "manual", message: "Email ou senha inválidos" });
            return;
        }
    };
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="p-10 rounded-2xl flex flex-col  justify-center shadow-lg border border-zinc-200 bg-white space-y-8 w-[90%] max-w-md min-h-[450px]">
                <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
                    <img src="favicon.ico" alt="Icon Task" className="h-10" />
                    Mini-Trello
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email")}
                            className="input-style"
                        />
                        <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("password")}
                            className="input-style"
                        />
                        <ErrorMessage name="password" />
                    </div>

                    <p>
                        Não possui uma conta?{" "}
                        <Link href="/register" className="hover:underline text-blue-600">
                            Cadastrar
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md font-medium transition duration-200"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </section>
    );
}
