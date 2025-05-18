import { check, isUserAuthenticated } from "@/utils/validations";
import { insertIn, selectFrom } from "@/utils/data/cruds";
import { uploadFile } from "@/utils/data/upload-file";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { AllowedRoles, Roles } from "@/utils/types/roles";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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

    const payload: Project = {
        name: formData.get("projectName") as string,
        description: formData.get("description") as string,
        project_link: formData.get("link") as string,
        image: imageData?.url as string,
        is_active: formData.get("isActive") as string
    }

    const { success: insertSuccess, data, message: insertErrorMessage } = await insertIn("projects", payload)
    check(insertSuccess, insertErrorMessage || "failed to insert in table: projects", "response", 500)

    // Revalidate both admin dashboard and client-side projects page
    revalidatePath("/admin/projects");

    return NextResponse.json({
        success: true,
        data
    })
}