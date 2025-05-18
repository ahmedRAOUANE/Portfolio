import { CustomResponse } from "../types/response";
import { createClient } from "../supabase/server";
import { check, checkUserAuthentication, withErrorHandling } from "../validations";
import { Roles } from "../types/roles";

export const uploadFile = async (file: File, bucketId: string, path: string): Promise<CustomResponse<{ url: string }>> =>
    await withErrorHandling(async () => {
        // check user authentication
        await checkUserAuthentication(Roles.admin);

        const supabase = await createClient();

        // Validate file
        check(!!file, "no file provided", "object");

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
            },
        };
    }) as CustomResponse<{ url: string }>;