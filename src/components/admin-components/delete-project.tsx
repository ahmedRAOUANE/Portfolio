"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ActionBtn from "../action-btn";

interface DeleteProjectProps {
    id: string;
    onDelete: () => Promise<void>;
}

const DeleteProject = ({ id, onDelete }: DeleteProjectProps) => {
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        startTransition(async () => {
            await onDelete();
            router.refresh();
        })
    }

    return (
        <ActionBtn
            onclick={handleDelete}
            pending={pending}
            action={{ state1: "Delete", state2: "Deleting..." }}
            className="text-danger hover:text-danger/80 bg-danger/10 hover:bg-danger/20 p-2 rounded-lg transition-all duration-300"
            title="Delete project"
        />
    )
}

export default DeleteProject;