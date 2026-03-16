"use server";

import { baseUrl } from "@/utils/constansts";
import { insertIn, selectFrom } from "@/utils/data/data-cruds";
import { FilterOptions } from "@/utils/types/filter";
import { Roles } from "@/utils/types/roles";
import { Routes } from "@/utils/types/routes";
import { checkForError } from "@/utils/validations";
import { revalidatePath } from "next/cache";

type ResumeType = {
    resumeName: string;
    description: string;
    link: string;
    created_at: string;
}
export const getResumes = async (role: Roles, filter?: FilterOptions, limit?: number) => {
    try {
        const { success, message, data } = await selectFrom<ResumeType[]>("resumes", "*", role, filter, limit)
        checkForError(success, message ?? "failed to get resume/s", "object");

        return data as ResumeType[];
    } catch (err) {
        console.log("error from get resume: ", err);
    }
}

export const addResume = async (formData: FormData) => {
    try {
        const payload = {
            resumeName: formData.get("resumeName"),
            description: formData.get("description"),
            link: formData.get("link"),
        };

        const { success: insertSuccess, message: insertErrorMessage } = await insertIn("resumes", payload, "*", Roles.admin)
        checkForError(insertSuccess, `insertion Error > POST > insertIn: ${insertErrorMessage || "failed to insert in table: resumes"}`, "object", 500)

        revalidatePath(`${baseUrl}/${Routes.admin}/resumes`);
        revalidatePath(`${baseUrl}/`);
    } catch (err) {
        console.log("error from add resume server action: ", err);
    }
}