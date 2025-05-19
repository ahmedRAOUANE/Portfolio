"use client";

import { baseUrl } from "@/utils/constansts";
import { CustomResponse } from "@/utils/types/response";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const AddProject = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const isActiveRef = useRef<HTMLInputElement>(null);

    const [pending, setPending] = useState(false);

    const router = useRouter();

    const handleAddProject = async (e: FormEvent): Promise<CustomResponse> => {
        e.preventDefault()

        setPending(true);

        const formData = new FormData();
        formData.append("projectName", nameRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("link", linkRef.current?.value || "");
        formData.append("isActive", isActiveRef.current?.value || "false")

        const imageFile = imageRef.current?.files?.[0];
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const res = await fetch(`${baseUrl}/api/projects`, {
            method: "POST",
            body: formData
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
    }

    return (
        <div className="w-full p-6 bg-dark rounded-lg shadow-md" >
            <h2 className="text-2xl font-bold mb-4" > Add New Project </h2>

            < form className="w-full flex flex-col gap-6" onSubmit={handleAddProject} >
                <div>
                    <label
                        htmlFor="projectName"
                        className="hidden"
                    >
                        Project Name
                    </label>
                    <input
                        ref={nameRef}
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
                        ref={linkRef}
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full p-2 bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                < div className="mb-6" >
                    <label
                        htmlFor="image"
                        className="hidden"
                    >
                        Image
                    </label>
                    <input
                        ref={imageRef}
                        placeholder="Project Image"
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        className="w-full p-2 bg-dark rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-dark file:bg-light file:text-dark hover:file:bg-secondary-light cursor-pointer"
                    />
                </div>
                
                <div className="mb-6 flex items-center justify-start gap-2" >
                    <input
                        defaultChecked={true}
                        ref={isActiveRef}
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        required
                    />
                    <label
                        htmlFor="isActive"
                    >
                        show this project
                    </label>
                </div>

                <button
                    type="submit"
                    className={`w-full p-2 bg-primary rounded-lg cursor-pointer ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {pending ? "Saving..." : "Save Project"}
                </button>
            </form>
        </div>
    )
}

export default AddProject;