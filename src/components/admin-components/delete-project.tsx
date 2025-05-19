"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
                body: JSON.stringify({id})
            });
            router.refresh();
        })
    }

    return (
        <button
            type="button" 
            title="delete project" 
            className="text-red-500 hover:text-red-700 cursor-pointer" 
            onClick={handleDelete}
            disabled={pending}
        >
            Delete
        </button>
    )
}

export default DeleteProject;