"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from "@/components/Modal";
import ModalTask from "@/components/ModalTask";

type Theme = "light" | "dark";
type Status = "TODO" | "doing" | "done";

export type Task = {
    id: string;
    title: string;
    status: Status;
    done: boolean;
    createdAt: number;
};

type Filter = "all" | "open" | "done";

const STORAGE_KEY = "taskboard:v1";

export default function Home() {
    const [theme, setTheme] = useState<Theme>("light");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<Filter>("all");
    const [firstName, setName] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ fullname?: string; email?: string; cpf?: string } | null>(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskStatus, setTaskStatus] = useState<Status>("TODO");

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return;
        try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            const name = parsedUser.fullname || "";
            setName(name.split(" ")[0]);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }, [isOpen]);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setTasks(JSON.parse(raw));
        else
            setTasks([
                { id: uuid(), title: "Explorar requisitos", status: "TODO", done: false, createdAt: Date.now() },
                { id: uuid(), title: "Criar layout base", status: "doing", done: false, createdAt: Date.now() },
                { id: uuid(), title: "Configurar Tailwind", status: "done", done: true, createdAt: Date.now() },
            ]);
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) window.location.href = "/login";
    }, []);

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
    }

    function formatCPF(cpf: string): string {
        const digits = cpf.replace(/\D/g, "");
        if (digits.length === 11) {
            return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
        return cpf;
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const root = document.documentElement;
        theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    }, [theme]);

    const addTask = (title: string, status: Status = "TODO") => {
        setTasks((prev) => [
            { id: uuid(), title: title.trim(), status, done: status === "done", createdAt: Date.now() },
            ...prev,
        ]);
        setIsTaskModalOpen(false);
    };

    const updateTask = (id: string, patch: Partial<Task>) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        return tasks.filter((t) => {
            const matchesQuery = !q || t.title.toLowerCase().includes(q);
            const matchesFilter = filter === "all" ? true : filter === "done" ? t.done : !t.done;
            return matchesQuery && matchesFilter;
        });
    }, [tasks, query, filter]);

    const dragTaskIdRef = useRef<string | null>(null);

    const onDragStart = (id: string) => (e: React.DragEvent) => {
        dragTaskIdRef.current = id;
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
    };

    const onDropColumn = (status: Status) => (e: React.DragEvent) => {
        e.preventDefault();
        const id = dragTaskIdRef.current || e.dataTransfer.getData("text/plain");
        if (!id) return;
        updateTask(id, { status, done: status === "done" });
        dragTaskIdRef.current = null;
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const Column = ({ status, title }: { status: Status; title: string }) => {
        const items = filtered.filter((t) => t.status === status);
        return (
            <section
                onDrop={onDropColumn(status)}
                onDragOver={onDragOver}
                className="flex-1 select-none bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-3 border border-zinc-200 dark:border-zinc-700"
            >
                <header className="flex items-center justify-between mb-3">
                    <h2 className="relative font-semibold text-zinc-900 dark:text-zinc-100">
                        {title}
                        {items.length > 0 && (
                            <span
                                className={`absolute -top-1 -right-4 flex items-center justify-center text-xs font-bold text-white w-4 h-4 rounded-full ${
                                    title === "Done" ? "bg-green-500" : "bg-yellow-400"
                                }`}
                            >
                                {items.length}
                            </span>
                        )}
                    </h2>

                    <button
                        onClick={() => {
                            setTaskStatus(status);
                            setEditingTask(null);
                            setIsTaskModalOpen(true);
                        }}
                        className="px-3 py-2 text-sm rounded-xl border cursor-pointer border-emerald-300 dark:border-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20"
                    >
                        +
                    </button>
                </header>

                <div className="space-y-2 max-h-[50vh] h-[50vh] overflow-y-auto pr-1">
                    {items.map((task) => (
                        <article
                            key={task.id}
                            draggable
                            onDragStart={onDragStart(task.id)}
                            className="group cursor-grab h-auto active:cursor-grabbing rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow-sm hover:shadow"
                        >
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    className="mt-1 size-4"
                                    checked={task.done}
                                    onChange={(e) =>
                                        updateTask(task.id, {
                                            done: e.target.checked,
                                            status: e.target.checked
                                                ? "done"
                                                : task.status === "done"
                                                ? "TODO"
                                                : task.status,
                                        })
                                    }
                                    title="Marcar como concluída"
                                />
                                <div className="flex-1">
                                    <div
                                        className={`text-sm leading-5 ${
                                            task.done
                                                ? "line-through text-zinc-400"
                                                : "text-zinc-900 dark:text-zinc-100"
                                        }`}
                                    >
                                        {task.title}
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={() => {
                                                setTaskStatus(task.status);
                                                setEditingTask(task);
                                                setIsTaskModalOpen(true);
                                            }}
                                            className={`text-xs cursor-pointer px-2 py-1 rounded border border-zinc-300 dark:border-zinc-600 ${
                                                task.done ? "hidden" : "cursor-pointer"
                                            }`}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-xs px-2 py-1 cursor-pointer rounded border border-red-300 text-red-600 dark:border-red-700"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                    {items.length === 0 && (
                        <div className="text-sm text-zinc-500 italic py-6 text-center">
                            Arraste tarefas para cá ou clique em “ + ”.
                        </div>
                    )}
                </div>
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-[#eae9e8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <ModalTask
                isOpen={isTaskModalOpen}
                onClose={() => {
                    setIsTaskModalOpen(false);
                    setEditingTask(null);
                }}
                status={taskStatus}
                onSave={(title) => {
                    if (editingTask) updateTask(editingTask.id, { title });
                    else addTask(title, taskStatus);
                }}
                initialTitle={editingTask?.title}
            />

            <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
                    <h1 className="text-2xl font-base flex flex-col">Mini Trello</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar tarefas..."
                            className="hidden sm:block px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 w-56"
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as Filter)}
                            className="hidden sm:block px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                            title="Filtro"
                        >
                            <option value="all">Todas</option>
                            <option value="open">Abertas</option>
                            <option value="done">Concluídas</option>
                        </select>
                        <button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="px-3 py-2 text-sm cursor-pointer rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                            title="Alternar tema"
                        >
                            {theme === "light" ? "☀️" : "🌙"}
                        </button>
                        <button
                            onClick={() => {
                                setEditingTask(null);
                                setTaskStatus("TODO");
                                setIsTaskModalOpen(true);
                            }}
                            className="px-3 py-2 text-sm rounded-xl border cursor-pointer border-emerald-300 dark:border-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20"
                        >
                            + Nova
                        </button>
                        <div className="flex gap-2 items-center justify-center bg-zinc-200 dark:bg-zinc-300 dark:text-black p-1 rounded-lg">
                            <img src="/user-svgrepo-com.svg" alt="Icon User" className="h-8  p-2 rounded-full" />
                            <p className="text-sm">
                                {firstName ? `Bem vindo, ${firstName}!` : `Bem vindo ao Mini-Trello!`}
                            </p>
                            <img
                                src="/arrow-down-svgrepo-com.svg"
                                alt="Icon Arrow Down"
                                className="h-8 cursor-pointer"
                                onClick={() => setIsOpen(true)}
                            />
                            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Menu">
                                <div className="text-zinc-600 text-sm">
                                    Nome: <span className="text-black">{user?.fullname || "Empty"}</span>
                                </div>
                                <div className="text-zinc-600 text-sm mt-2">
                                    Email: <span className="text-black">{user?.email || "Empty"}</span>
                                </div>
                                <div className="text-zinc-600 text-sm mt-2">
                                    CPF: <span className="text-black">{user?.cpf ? formatCPF(user.cpf) : "Empty"}</span>
                                </div>
                                <button
                                    className="mt-4 px-4 py-1 w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded"
                                    onClick={handleLogout}
                                >
                                    SAIR
                                </button>
                            </Modal>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Column status="TODO" title="TODO" />
                    <Column status="doing" title="Doing" />
                    <Column status="done" title="Done" />
                </div>
            </main>

            <footer className="max-w-6xl mx-auto px-4 pb-8 text-sm text-zinc-500">
                Dica: arraste cartões entre colunas • clique no título para editar • use o checkbox para concluir.
            </footer>
        </div>
    );
}
