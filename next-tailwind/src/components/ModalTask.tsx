"use client";

import { useEffect, useState } from "react";

type Status = "TODO" | "doing" | "done";

type ModalTaskProps = {
    isOpen: boolean;
    onClose: () => void;
    status: Status;
    onSave: (title: string) => void;
    initialTitle?: string;
};

export default function ModalTask({ isOpen, onClose, status, onSave, initialTitle = "" }: ModalTaskProps) {
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-lg w-[90%] max-w-md p-6 animate-fadeIn">
                <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                    {initialTitle ? "Editar Tarefa" : "Nova Tarefa"}
                </h2>
                <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da tarefa"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition"
                />
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            if (!title.trim()) return;
                            onSave(title.trim());
                            setTitle("");
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition"
                    >
                        Salvar
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
