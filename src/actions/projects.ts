"use server";

import { checkForError as check, checkUserAuthentication, isUserAuthenticated, withErrorHandling } from "@/utils/validations";
import { uploadFile } from "@/utils/data/files-cruds";
import { createClient } from "@/utils/supabase/server";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { AllowedRoles, Roles } from "@/utils/types/roles";
import { selectFrom } from "@/utils/data/data-cruds";
import { FilterOptions } from "@/utils/types/filter";

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

export const addProject = async (payload: FormData): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        const supabase = await createClient();

        // check if the user is authenticated
        const { success, data } = await isUserAuthenticated();
        const role = data?.role as AllowedRoles;

        check(success, "User not authenticated", "object");

        check(role === Roles.admin, "Admin not authorized - Only admins can access this route", "object")

        // upload file
        const { success: uploadSuccess, data: uploadData } = await uploadFile(payload.get("image") as File, "projects", "images");
        check(uploadSuccess, "Error uploading file", "object")

        const imgUrl = uploadData?.url;

        const project = {
            name: payload.get("projectName") as string,
            description: payload.get("description") as string,
            link: payload.get("link") as string,
            image: imgUrl,
        }

        // add project to the database
        const { data: projectData, error } = await supabase
            .from("projects")
            .insert([project]);

        check(!error, "Error adding project", "object");

        return {
            success: true,
            data: projectData,
        };
    }) as CustomResponse
}
