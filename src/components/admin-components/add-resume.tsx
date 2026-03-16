"use client";

import { addResume } from "@/actions/resumes";
import ActionBtn from "../action-btn";

const AddResume = () => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Add New Resume</h2>

            <form
                className="w-full flex flex-col gap-6"
                action={addResume}
            >
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="resumeName" className="hidden">Resume Name</label>
                    <input
                        // ref={resNameRef}
                        placeholder="Resume Name"
                        type="text"
                        id="resumeName"
                        name="resumeName"
                        required
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    />
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="description" className="hidden">Resume Description</label>
                    <textarea
                        // ref={descriptionRef}
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
                        // ref={linkRef}
                        placeholder="Project Link/URL"
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    />
                </div>

                {/* <div className="mb-6 flex items-center justify-start gap-2">
                    <input
                        defaultChecked={true}
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/50"
                    />
                    <label htmlFor="isActive" className="text-light">
                        Show this resume
                    </label>
                </div> */}

                <ActionBtn
                    // pending={pending}
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