"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ActionBtn from "../action-btn";

const DeleteProject = ({id}: {id: string}) => {
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        startTransition(async () => {
            await fetch("/api/projects", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id }),
                credentials: "include"
            });
            router.refresh();
        })
    }

    return <ActionBtn
        onclick={handleDelete}
        pending={pending}
        action={{ state1: "delete", state2: "deleting..." }}
        className="text-red-500 bg-red-400/20"
        title="delete project"
    />
}

export default DeleteProject;