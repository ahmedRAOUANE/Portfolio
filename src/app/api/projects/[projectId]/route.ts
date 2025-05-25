import { selectFrom, updateIn } from "@/utils/data/data-cruds";
import { updateFile } from "@/utils/data/files-cruds";
import { UploadFileResponse } from "@/utils/types/file";
import { Project } from "@/utils/types/project";
import { CustomResponse } from "@/utils/types/response";
import { Roles } from "@/utils/types/roles";
import { checkForError as check, checkUserAuthentication, withErrorHandling } from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, { params }: { params: Promise<{ projectId: string }> }): Promise<NextResponse<CustomResponse>> => {
    return await withErrorHandling(async () => {
        // validate project id
        const { projectId } = await params;
        check(!!projectId, "no project specified!, check your logic in api/project/[projectId]/route.ts and admin/project/[projectId]/page.tsx", "response", 400);
        
        await checkUserAuthentication(Roles.admin);

        // check the row exists
        const { success: ValidationSuccess, message: ValidationMessage, data: selectedProject  } = await selectFrom("projects", "*", Roles.admin, {column: "id", value: projectId});
        check(ValidationSuccess, ValidationMessage || "Update row Error: The row you are trying to update can not be found", "response", 404);

        const fileData = (Array.isArray(selectedProject) ? selectedProject[0] : selectedProject) as Project;
        
        const formData = await request.formData();

        // handle text values
        const name = formData.get("projectName") as string;
        const description = formData.get("description") as string;
        const link = formData.get("link") as string;
        const isActive = formData.get("isActive") as string;

        // handle image
        const imageFile = formData.get("image") as File;
        let imageData: UploadFileResponse | undefined;

        if (imageFile && imageFile.size > 0) {
            const fileName = fileData.image.fileName;
            check(!!fileName, "Update Error: No fileName found in selectedProject", "response", 500);

            const { success, message, data: imageDataResponse } = await updateFile(imageFile, "projects", "images", fileName);
            check(success, message || "Updating Error: filed to update image", "response", 500);

            imageData = imageDataResponse as UploadFileResponse;
        }

        // handledata
        /**
         * this will change only the provided data, and won't effect on the others
         */
        const updatedData: Partial<Project> = {
            ...(name && { name }),
            ...(description && { description }),
            ...(link && { project_link: link }),
            ...(isActive && { is_active: isActive === "true" }),
            ...(imageData && { image: imageData })
        }

        const { success, message, data } = await updateIn("projects", updatedData, Roles.admin, { column: "id", value: projectId })
        check(success, message || "Update Error: Something went wrong while updating", "response", 500);

        return NextResponse.json({
            success,
            data
        }, { status: 200 })
    }) as NextResponse<CustomResponse>
}