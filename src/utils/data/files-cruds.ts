import { CustomResponse } from "../types/response";
import { createClient } from "../supabase/server";
import { check, checkUserAuthentication, withErrorHandling } from "../validations";
import { Roles } from "../types/roles";
import { UploadFileResponse } from "../types/file";

export const uploadFile = async (file: File, bucketId: string, path: string): Promise<CustomResponse<UploadFileResponse>> =>
    await withErrorHandling(async () => {
        // validate file, bucketId, path
        check(!!file || !!bucketId || !!path, "Upload file Error: buckedId or path or file is not vlid!", "object");

        // check user authentication
        await checkUserAuthentication(Roles.admin);

        const supabase = await createClient();

        // validate file type
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
        check(ALLOWED_TYPES.includes(file.type), "Invalid file type. Only JPEG, PNG, and WebP are allowed", "object")

        // Sanitize filename - remove spaces and special characters
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const timestamp = Date.now();
        const fileName = `${timestamp}_${sanitizedName}`;

        const { data, error } = await supabase.storage
            .from(bucketId)
            .upload(`${path}/${fileName}`, file, {
                cacheControl: "3600",
                upsert: true,
            });

        check(!error, error?.message || "Error uploading file", "object")

        const { data: { publicUrl } } = supabase.storage
            .from(bucketId)
            .getPublicUrl(data!.path);

        check(!!publicUrl, "Error Getting public Url", "object")

        return {
            success: true,
            data: {
                url: publicUrl,
                fileName
            },
        };
    }) as CustomResponse<UploadFileResponse>;

/**
 * 
 * @param bucketId 
 * @param path 
 * @param fileName 
 * @returns 
 */
export const deleteFile = async (bucketId: string, path: string, fileName: string): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        // validate bucketId, path, fileName
        check(!!bucketId || !!path || !!fileName, "Delete file Error: buckedId or path or fileName is not vlid!", "object");
        
        await checkUserAuthentication(Roles.admin);

        const supabase = await createClient();

        const {data, error} = await supabase
            .storage
            .from(bucketId)
            .remove([`${path}/${fileName}`])

        check(!error, `Error Deleting File: ${error?.message || "Something went wrong, check your logic or permissions"}`, "object");

        return {
            success: true,
            data
        }
    }) as CustomResponse;
}
