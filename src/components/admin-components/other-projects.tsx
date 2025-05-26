"use client";

import { Project } from "@/utils/types/project";
import Link from "next/link";
import { baseUrl } from "@/utils/constansts";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import ActionBtn from "../action-btn";

const OtherProjects = () => {
    const [otherProjects, setOtherProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingDeletes, setPendingDeletes] = useState<Map<string, boolean>>(new Map());

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${baseUrl}/api/projects`);
            const { data }: { data: Project[] } = await res.json();
            setOtherProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

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
                setOtherProjects(prevProjects =>
                    prevProjects.filter(project => project.id?.toString() !== id)
                );
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
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Other Projects</h2>

            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-24 bg-primary/10 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : !otherProjects || otherProjects.length === 0 ? (
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/30 text-center">
                        <p className="text-light">No projects available.</p>
                    </div>
                ) : (
                    otherProjects.map((project) => {
                        const projectId = project.id?.toString();
                        if (!projectId) return null;

                        return (
                            <div
                                key={projectId}
                                className="group flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300"
                            >
                                {project.image && (
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={project.image.url}
                                            alt={project.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-grow">
                                    <Link
                                        href={`/admin/projects/${projectId}`}
                                        className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                                    >
                                        {project.name}
                                    </Link>
                                    <p className="text-sm text-light line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                <ActionBtn
                                    onclick={() => handleProjectDelete(projectId)}
                                    pending={pendingDeletes.get(projectId) || false}
                                    action={{ state1: "Delete", state2: "Deleting..." }}
                                    className="text-danger hover:text-danger/80 bg-danger/10 hover:bg-danger/20 p-2 rounded-lg transition-all duration-300"
                                    title="Delete project"
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default OtherProjects;