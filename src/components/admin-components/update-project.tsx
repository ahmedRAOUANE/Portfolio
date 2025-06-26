"use client";

import { baseUrl } from "@/utils/constansts";
import { CustomResponse } from "@/utils/types/response";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import ActionBtn from "../action-btn";
import { Project } from "@/utils/types/project";
import Image from "next/image";

interface Props {
    project: Project
}

const UpdateProject = ({ project }: Props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const isActiveRef = useRef<HTMLInputElement>(null);

    const [pending, setPending] = useState(false);
    const [imagePreview, setImagePreview] = useState<File | null>(null)

    const router = useRouter();

    if (!project) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImagePreview(file);
        } else {
            setImagePreview(null)
        }
    }

    const handleUpdateProject = async (e: FormEvent): Promise<CustomResponse> => {
        e.preventDefault()

        setPending(true);

        const formData = new FormData();
        formData.append("projectName", nameRef.current?.value || project.name);
        formData.append("description", descriptionRef.current?.value || project.description);
        formData.append("link", linkRef.current?.value || project.project_link);
        formData.append("isActive", isActiveRef.current?.checked ? "true" : "false")

        if (imagePreview) {
            formData.append("image", imagePreview);
        }

        try {
            const res = await fetch(`${baseUrl}/api/projects/${project.id}`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })

            const result = await res.json();
            if (!res.ok) {
                return {
                    success: false,
                    message: "client: failed to add project"
                }
            }

            if (result) {
                setPending(false);
            }

            router.refresh();

            return {
                success: true,
                message: "project added successfully"
            }
        } catch (error) {
            setPending(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Failed to add project"
            }
        }
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Update Project</h2>

            <form className="w-full flex flex-col gap-6" onSubmit={handleUpdateProject}>
                <div className="space-y-2">
                    <label
                        htmlFor="projectName"
                        className="block text-sm font-medium text-light"
                    >
                        Project Name
                    </label>
                    <input
                        ref={nameRef}
                        defaultValue={project.name}
                        placeholder="Project Name"
                        type="text"
                        id="projectName"
                        name="projectName"
                        required
                        className="w-full p-3 rounded-lg text-foreground bg-primary/10 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-light"
                    >
                        Description
                    </label>
                    <textarea
                        defaultValue={project.description}
                        ref={descriptionRef}
                        placeholder="Description"
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full p-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="link"
                        className="block text-sm font-medium text-light"
                    >
                        Project Link
                    </label>
                    <input
                        defaultValue={project.project_link}
                        ref={linkRef}
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full p-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-light">
                        Project Image
                    </label>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-primary/20">
                        {imagePreview ? (
                            <Image
                                src={URL.createObjectURL(imagePreview)}
                                alt="Project Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <Image
                                src={project.image.url}
                                alt="Project Preview"
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="image" className="hidden">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 bg-primary/10 border border-primary/20 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer transition-all duration-300"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        defaultChecked={project.is_active}
                        ref={isActiveRef}
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/50"
                    />
                    <label
                        htmlFor="isActive"
                        className="text-sm font-medium text-light"
                    >
                        Show this project
                    </label>
                </div>

                <ActionBtn
                    pending={pending}
                    action={{ state1: "Update Project", state2: "Updating..." }}
                    className="bg-primary hover:bg-primary/90 text-white"
                    type="submit"
                    title="Update project"
                />
            </form>
        </div>
    )
}

export default UpdateProject;