import { checkForError as check, checkUserAuthentication, withErrorHandling } from "@/utils/validations";
import { deleteFrom, insertIn, selectFrom } from "@/utils/data/data-cruds";
import { uploadFile } from "@/utils/data/files-cruds";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { Roles } from "@/utils/types/roles";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Routes } from "@/utils/types/routes";
import { baseUrl } from "@/utils/constansts";
import { UploadFileResponse } from "@/utils/types/file";
import { FilterOptions } from "@/utils/types/filter";

// Handle CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': `${baseUrl}`,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const OPTIONS = async () => {
    return NextResponse.json({}, { headers: corsHeaders })
}

/** GET All Projects */
export const GET = async (request: NextRequest): Promise<NextResponse<CustomResponse<Project[]>>> => {
    return await withErrorHandling(async () => {
        const searchParams = request.nextUrl.searchParams

        let filter: FilterOptions | null = null;
        if (searchParams.has("is_active")) {
            filter = { column: "is_active", value: searchParams.get("is_active") }
        } else if (searchParams.has("id")) {
            filter = { column: "id", value: searchParams.get("is_active") }
        }

        const { success: selectSuccess, message: selectErrorMessage, data: projects } = await selectFrom("projects", "*", Roles.anone, filter)
        check(selectSuccess, `selection Error > GET: ${selectErrorMessage || "failed to get projects"}`, "response", 500)

        return NextResponse.json({
            success: selectSuccess,
            data: projects
        })
    }) as NextResponse<CustomResponse<Project[]>>
}

export const POST = async (request: NextRequest): Promise<NextResponse<CustomResponse>> => {
    return await withErrorHandling(async () => {
        const formData = await request.formData();

        // upload project image and get the url
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

        return NextResponse.json({
            success: true,
            data
        })
    }) as NextResponse<CustomResponse>
}

export const DELETE = async (request: NextRequest): Promise<NextResponse<CustomResponse>> => {
    return await withErrorHandling(async () => {
        // parse id from request
        const { id } = await request.json();
        check(!!id, "Delete Error > DELETE > validation: id not valid", "response", 500) // for now

        // auth check
        await checkUserAuthentication(Roles.admin);

        // delete
        const { success } = await deleteFrom("projects", id, Roles.admin);
        check(success, "Delete Error > DELETE > deleteFrom: something went wrong when deleting row", "response", 500);

        revalidatePath(`${baseUrl}/${Routes.admin}/projects`)

        return NextResponse.json({
            success,
        }, { status: 200 })
    }) as NextResponse<CustomResponse>
}