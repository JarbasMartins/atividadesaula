import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute translate-y-32 z-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="bg-white  rounded-xl p-6 mt-8 border border-zinc-300 w-auto min-w-52 min-h-52 max-w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    {title && <h2 className="text-xl font-semibold text-zinc-800tracking-tight">{title}</h2>}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-100  cursor-pointer"
                        aria-label="Fechar modal"
                    >
                        <img src="/close-svgrepo-com.svg" alt="Icon Close" className="h-4 w-4" />
                    </button>
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">{children}</div>
            </div>
        </div>
    );
}
