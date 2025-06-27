"use server";

import { checkForError as check, checkUserAuthentication, withErrorHandling } from "@/utils/validations";
import { uploadFile } from "@/utils/data/files-cruds";
// import { createClient } from "@/utils/supabase/server";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { AllowedRoles, Roles } from "@/utils/types/roles";
import { insertIn, selectFrom } from "@/utils/data/data-cruds";
import { FilterOptions } from "@/utils/types/filter";
import { UploadFileResponse } from "@/utils/types/file";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/utils/constansts";
import { Routes } from "@/utils/types/routes";

//! this function is deprecated, use fetch request instead
export const getProjects = async (forRole: AllowedRoles, filter?: FilterOptions): Promise<CustomResponse<Project[]>> => {
    const { success, message, data } = await selectFrom("projects", "*", forRole, filter) //! this line does not work due to header/coockies issue
    // let query = supabase.from("projects").select("*")

    // if (filter) {
    //     query = query.eq(filter.column, filter.value)
    // }
    // const { data, error } = await query;

    check(success, message || "Error fetching projects", "object")

    return {
        success: true,
        data: data as Project[],
    };
    // return await withErrorHandling(async () => {
    // }) as CustomResponse<Project[]>
}

export const getSingleProject = async (projectId: string): Promise<CustomResponse<Project>> => {
    return await withErrorHandling(async () => {
        // auth check
        await checkUserAuthentication(Roles.admin);

        // const serverSupabase = await createClient()
        const { success, message, data } = await selectFrom("projects", "*", Roles.admin, { column: "id", value: projectId });
        check(success, message || "Error getting single project", "object");

        return {
            success,
            data
        }
    }) as CustomResponse<Project>
}

export const addProject = async (formData: FormData): Promise<CustomResponse> => {
    const imageFile = formData.get("image") as File;

    const { success: imageSuccess, data: imageData, message } = await uploadFile(imageFile, "projects", "images");
    check(imageSuccess, `insertion Error > POST > uploadFile: ${message || "failed too upload file"}`, "response", 500)

    const { url, fileName } = imageData as UploadFileResponse;
    const payload: Project = {
        name: formData.get("projectName") as string,
        description: formData.get("description") as string,
        project_link: formData.get("link") as string,
        is_active: !!formData.get("isActive"),
        image: {
            url,
            fileName
        }
    }

    const { success: insertSuccess, data, message: insertErrorMessage } = await insertIn("projects", payload, "*", Roles.admin)
    check(insertSuccess, `insertion Error > POST > insertIn: ${insertErrorMessage || "failed to insert in table: projects"}`, "response", 500)

    revalidatePath(`${baseUrl}/${Routes.admin}/projects`);

    return {
        success: true,
        data
    }
    // return await withErrorHandling(async () => {
    // }) as CustomResponse
}
