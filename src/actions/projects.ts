"use server";

import { check, checkUserAuthentication, isUserAuthenticated, withErrorHandling } from "@/utils/validations";
import { uploadFile } from "@/utils/data/files-cruds";
import { createClient } from "@/utils/supabase/server";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { AllowedRoles, Roles } from "@/utils/types/roles";
import { supabase } from "@/utils/supabase/client";
import { selectFrom } from "@/utils/data/data-cruds";

export const getProjects = async (): Promise<CustomResponse<Project[]>> => {
    return await withErrorHandling(async () => {
        const { data: projects, error } = await supabase
            .from("projects")
            .select();

        check(!error, "Error fetching projects", "object")

        return {
            success: true,
            data: projects!,
        };
    }) as CustomResponse<Project[]>
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
