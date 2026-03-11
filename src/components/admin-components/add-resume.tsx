"use client";

import { baseUrl } from "@/utils/constansts";
import { CustomResponse } from "@/utils/types/response";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import ActionBtn from "../action-btn";

const AddResume = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const isActiveRef = useRef<HTMLInputElement>(null);

    const [pending, setPending] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const router = useRouter();

    const resetForm = () => {
        if (nameRef.current) nameRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (isActiveRef.current) isActiveRef.current.checked = true;
        if (imagePreview) setImagePreview(null);
    }

    const handleAddResume = async (e: FormEvent): Promise<CustomResponse> => {
        e.preventDefault()

        setPending(true);

        const formData = new FormData();
        formData.append("resumeName", nameRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("link", linkRef.current?.value || "");
        formData.append("isActive", (isActiveRef.current?.checked ? "true" : "false"))
        formData.append("createdAt", Date.now().toString());

        try {
            const res = await fetch(`${baseUrl}/api/resume`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })

            await res.json();
            if (!res.ok) {
                return {
                    success: false,
                    message: "client: failed to add resume"
                }
            }

            resetForm();
            setPending(false);

            router.refresh();

            return {
                success: true,
                message: "resume added successfully"
            }
        } catch (error) {
            setPending(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Failed to add resume"
            }
        }
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Add New Resume</h2>

            <form className="w-full flex flex-col gap-6" onSubmit={handleAddResume}>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="projectName" className="hidden">Resume Name</label>
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
                    <label htmlFor="description" className="hidden">Resume Description</label>
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
                    <label htmlFor="link" className="hidden">Resume Link/URL</label>
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
                        Show this resume
                    </label>
                </div>

                <ActionBtn
                    pending={pending}
                    action={{ state1: "Save Resume", state2: "Saving..." }}
                    className="bg-primary/30 hover:bg-primary/40 text-foreground p-3 rounded-lg transition-all duration-300"
                    type="submit"
                    title="Add Resume"
                />
            </form>
        </div>
    )
}

export default AddResume;