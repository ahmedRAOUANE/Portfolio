import { check, checkUserAuthentication, isUserAuthenticated, withErrorHandling } from "@/utils/validations";
import { deleteFrom, insertIn, selectFrom } from "@/utils/data/data-cruds";
import { uploadFile } from "@/utils/data/files-cruds";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { AllowedRoles, Roles } from "@/utils/types/roles";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Routes } from "@/utils/types/routes";
import { baseUrl } from "@/utils/constansts";
import { UploadFileResponse } from "@/utils/types/file";

/** GET All Projects */
export const GET = async () => {
    // check if the user is authenticated
    const { success, data, message } = await isUserAuthenticated();
    const role = data?.role as AllowedRoles;
    check(success, message || "authentication check error", "response", 401);

    // check user role
    check(role === Roles.admin, "Admin not authorized - Only admins can access this route", "response", 403)

    const { success: selectSuccess, message: selectErrorMessage, data: projects } = await selectFrom("projects", "*", Roles.admin)
    check(success, selectErrorMessage || "failed to get projects", "response", 500)

    return NextResponse.json({
        success: selectSuccess,
        data: projects
    })
}

export const POST = async (request: NextRequest): Promise<NextResponse<CustomResponse>> => {
    const formData = await request.formData();

    // upload project image and get the url
    const imageFile = formData.get("image") as File;

    const { success: imageSuccess, data: imageData, message } = await uploadFile(imageFile, "projects", "images");
    check(imageSuccess, message || "failed too upload file", "response", 500)

    const { url, fileName } = imageData as UploadFileResponse;
    const payload: Project = {
        name: formData.get("projectName") as string,
        description: formData.get("description") as string,
        project_link: formData.get("link") as string,
        is_active: formData.get("isActive") as string,
        image: {
            url,
            fileName
        }
    }

    const { success: insertSuccess, data, message: insertErrorMessage } = await insertIn("projects", payload)
    check(insertSuccess, insertErrorMessage || "failed to insert in table: projects", "response", 500)

    revalidatePath(`${baseUrl}/${Routes.admin}/projects`);

    return NextResponse.json({
        success: true,
        data
    })
}

export const DELETE = async (request: NextRequest): Promise<NextResponse<CustomResponse>> => {
    return await withErrorHandling(async () => {
        // parse id from request
        const { id } = await request.json();
        check(!!id, "Delete Eror: id not available or not valid", "response", 500) // for now

        // auth check
        await checkUserAuthentication(Roles.admin);

        // delete
        const { success } = await deleteFrom("projects", id, Roles.admin);
        check(success, "Delete Error: something went wrong when deleting row", "response", 500);

        revalidatePath(`${baseUrl}/${Routes.admin}/projects`)

        return NextResponse.json({
            success,
        }, { status: 200 })
    }) as NextResponse<CustomResponse>
}