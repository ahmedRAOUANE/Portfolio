"use client";

import { baseUrl } from "@/utils/constansts";
import { CustomResponse } from "@/utils/types/response";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import ActionBtn from "../action-btn";
import Image from "next/image";

const AddProject = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const isActiveRef = useRef<HTMLInputElement>(null);

    const [pending, setPending] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    const resetForm = () => {
        if (nameRef.current) nameRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (imageRef.current) imageRef.current.value = "";
        if (isActiveRef.current) isActiveRef.current.checked = true;
        if (imagePreview) setImagePreview(null);
    }

    const handleAddProject = async (e: FormEvent): Promise<CustomResponse> => {
        e.preventDefault()

        setPending(true);

        const formData = new FormData();
        formData.append("projectName", nameRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("link", linkRef.current?.value || "");
        formData.append("isActive", (isActiveRef.current?.checked ? "true" : "false"))

        const imageFile = imageRef.current?.files?.[0];
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch(`${baseUrl}/api/projects`, {
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
                resetForm();
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
            <h2 className="text-2xl font-bold mb-6 text-primary">Add New Project</h2>

            <form className="w-full flex flex-col gap-6" onSubmit={handleAddProject}>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="projectName" className="hidden">Project Name</label>
                    <input
                        ref={nameRef}
                        placeholder="Project Name"
                        type="text"
                        id="projectName"
                        name="projectName"
                        required
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    />
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="description" className="hidden">Description</label>
                    <textarea
                        ref={descriptionRef}
                        placeholder="Description"
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50 resize-none"
                    ></textarea>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="link" className="hidden">Link / URL</label>
                    <input
                        ref={linkRef}
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    />
                </div>

                <div className="mb-6">
                    <div>
                        {imagePreview && (
                            <div className="mb-4 relative w-full aspect-video">
                                <Image
                                    src={imagePreview}
                                    alt="Project Preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                                <ActionBtn
                                    type="button"
                                    onclick={() => {
                                        setImagePreview(null);
                                        if (imageRef.current) imageRef.current.value = "";
                                    }}
                                    className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </ActionBtn>
                            </div>
                        )}
                    </div>

                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                        <label htmlFor="image" className="hidden">Image</label>
                        <input
                            onChange={handleImageChange}
                            ref={imageRef}
                            placeholder="Project Image"
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            required
                            className="w-full bg-transparent text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/30 file:text-foreground hover:file:bg-primary/40 file:transition-all file:duration-300 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-start gap-2">
                    <input
                        defaultChecked={true}
                        ref={isActiveRef}
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/50"
                    />
                    <label htmlFor="isActive" className="text-light">
                        Show this project
                    </label>
                </div>

                <ActionBtn
                    pending={pending}
                    action={{ state1: "Save Project", state2: "Saving..." }}
                    className="bg-primary/30 hover:bg-primary/40 text-foreground p-3 rounded-lg transition-all duration-300"
                    type="submit"
                    title="Add Project"
                />
            </form>
        </div>
    )
}

export default AddProject;