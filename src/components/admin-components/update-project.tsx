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
        <div className="w-96" >
            <h2 className="text-2xl font-bold mb-4" > Add New Project </h2>

            < form className="w-full flex flex-col gap-6" onSubmit={handleUpdateProject} >
                <div>
                    <label
                        htmlFor="projectName"
                        className="hidden"
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
                        className="w-full p-2 rounded-lg text-foreground bg-dark"
                    />
                </div>

                < div >
                    <label
                        htmlFor="description"
                        className="hidden"
                    >
                        Description
                    </label>
                    <textarea
                        defaultValue={project.description}
                        ref={descriptionRef}
                        placeholder="description"
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full p-2 bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                </div>

                < div >
                    <label
                        htmlFor="link"
                        className="hidden"
                    >
                        Link / URL
                    </label>
                    <input
                        defaultValue={project.project_link}
                        ref={linkRef}
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full p-2 bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                < div className="mb-6 flex flex-col gap-4" >
                    <div className="relative w-full aspect-video">
                        <div className="animate-pulse w-full h-full"></div>

                        <Image
                            src={imagePreview ? URL.createObjectURL(imagePreview) : project.image.url}
                            alt="Project Preview"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="image"
                            className="hidden"
                        >
                            Image
                        </label>
                        <input
                            placeholder="Project Image"
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 bg-dark rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-dark file:bg-light file:text-dark hover:file:bg-secondary-light cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-start gap-2" >
                    <input
                        defaultChecked={project.is_active}
                        ref={isActiveRef}
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                    />
                    <label
                        htmlFor="isActive"
                    >
                        show this project
                    </label>
                </div>

                <ActionBtn
                    pending={pending}
                    action={{ state1: "save", state2: "saving..." }}
                    className="bg-primary"
                    type="submit"
                    title="add project"
                />
            </form>
        </div>
    )
}

export default UpdateProject;