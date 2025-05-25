import { CustomResponse } from "../types/response";
import { createClient } from "../supabase/server";
import { checkForError, checkUserAuthentication, withErrorHandling } from "../validations";
import { Roles } from "../types/roles";
import { UploadFileResponse } from "../types/file";

/**
 * 
 * @param {File} file 
 * @param {string} bucketId 
 * @param {string} path 
 * @returns {Promise<CustomResponse<UploadFileResponse>>}
 */
export const uploadFile = async (file: File, bucketId: string, path: string): Promise<CustomResponse<UploadFileResponse>> =>
    await withErrorHandling(async () => {
        // validate file, bucketId, path
        checkForError(!!file || !!bucketId || !!path, "Upload file Error > uploadFile > validation: buckedId or path or file is not vlid!", "object");

        // check user authentication
        await checkUserAuthentication(Roles.admin);

        const supabase = await createClient();

        // validate file type
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
        checkForError(ALLOWED_TYPES.includes(file.type), "upload file Error > uploadFile > validation: Invalid file type. Only JPEG, PNG, and WebP are allowed", "object")

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

        checkForError(!error, `upload file Error > uploadFile: ${error?.message || "Error uploading file"}`, "object")

        const { data: { publicUrl } } = supabase.storage
            .from(bucketId)
            .getPublicUrl(data!.path);

        checkForError(!!publicUrl, "upload file Error > uploadFile: Error Getting public Url", "object")

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
 * @param {string} bucketId 
 * @param {string} path 
 * @param {string} fileName 
 * @returns {Promise<CustomResponse>}
 */
export const deleteFile = async (bucketId: string, path: string, fileName: string): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        // validate bucketId, path, fileName
        checkForError(!!bucketId || !!path || !!fileName, "Delete file Error > deleteFile > validation: buckedId or path or fileName is not vlid!", "object");
        
        await checkUserAuthentication(Roles.admin);

        const supabase = await createClient();

        const {data, error} = await supabase
            .storage
            .from(bucketId)
            .remove([`${path}/${fileName}`])

        checkForError(!error, `Deleting File Error > deleteFile: ${error?.message || "Something went wrong, check your logic or permissions"}`, "object");

        return {
            success: true,
            data
        }
    }) as CustomResponse;
}

/**
 * this function deletes the pld file and upload the new one
 * @param {File} file 
 * @param {string} buckedId 
 * @param {string} path 
 * @param {string} fileName 
 * @returns {Promise<CustomResponse<UploadFileResponse>>}
 */
export const updateFile = async (file: File, buckedId: string, path: string, fileName: string): Promise<CustomResponse<UploadFileResponse>> => {
    return await withErrorHandling(async () => {
        checkForError(!!file || !!buckedId || !!path || !!fileName, "updating file Error > updateFile: validation error", "object");

        const { success: deleteSuccess, message: DeleteErrorMessage } = await deleteFile(buckedId, path, fileName);
        checkForError(deleteSuccess, `updating file Error > updateFile > deleteFile: ${DeleteErrorMessage || "an error occured while deleting file!"}`, "object");

        const { success, message, data } = await uploadFile(file, buckedId, path);
        checkForError(success, `updating file Error > updateFile > uploadFile: ${message || "an error occured while uploading file!"}`, "object");

        return {
            success,
            data
        }
    }) as CustomResponse<UploadFileResponse>;
}
