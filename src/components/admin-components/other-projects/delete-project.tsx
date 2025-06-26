"use client";

import ActionBtn from "@/components/action-btn";
import { revalidatePath } from "next/cache";
import { useState } from "react";

const DeleteProjectBtn = ({projectId}: {projectId: string}) => {
    const [pendingDeletes, setPendingDeletes] = useState<Map<string, boolean>>(new Map());

    const handleProjectDelete = async (id: string) => {
        try {
            // Set pending state for this specific project
            setPendingDeletes(prev => new Map(prev).set(id, true));

            const res = await fetch("/api/projects", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id }),
                credentials: "include"
            });

            if (res.ok) {
                // Update local state by removing the deleted project
                // setOtherProjects(prevProjects =>
                //     prevProjects.filter(project => project.id?.toString() !== id)
                // );
                //! this might not work as expected, since this is a client component
                revalidatePath("/admin/projects");
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        } finally {
            // Clear pending state for this specific project
            setPendingDeletes(prev => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        }
    };

    return (
        <ActionBtn
            onclick={() => handleProjectDelete(projectId)}
            pending={pendingDeletes.get(projectId) || false}
            action={{ state1: "Delete", state2: "Deleting..." }}
            className="text-danger hover:text-danger/80 bg-danger/10 hover:bg-danger/20 p-2 rounded-lg transition-all duration-300"
            title="Delete project"
        />
    )
}

export default DeleteProjectBtn;