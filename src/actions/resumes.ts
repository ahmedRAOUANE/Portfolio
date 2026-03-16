"use server";

import { baseUrl } from "@/utils/constansts";
import { insertIn } from "@/utils/data/data-cruds";
import { Roles } from "@/utils/types/roles";
import { Routes } from "@/utils/types/routes";
import { checkForError } from "@/utils/validations";
import { revalidatePath } from "next/cache";

type ResumeType = {
    resumeName: string;
    description: string;
    link: string;
    isActive: boolean;
    createdAt: string;
}
export const getResumes = async (): Promise<ResumeType[]> => {
    console.log("get resumes server action trigered");
    return [{
        resumeName: "resume",
        description: "resume",
        link: "link to resume",
        isActive: false,
        createdAt: "21/3/26"
    }]
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
    } catch (err) {
        console.log("error from add resume server action: ", err);
    }
}