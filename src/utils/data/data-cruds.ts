import { check, checkUserAuthentication, withErrorHandling } from "../validations";
import { createClient } from "../supabase/server";
import { CustomResponse } from "../types/response";
import { AllowedRoles, Roles } from "../types/roles";
import { Project } from "../types/project";
import { deleteFile } from "./files-cruds";

type FilterOptions = {
    column: string;
    value: string;
} | null;
export const selectFrom = async (table: string, select?: string, forRole: AllowedRoles = "user", filter: FilterOptions = null): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        await checkUserAuthentication(forRole!)

        const supabase = await createClient();

        let query = supabase
            .from(table)
            .select(select);

        if (filter) {
            query = query.eq(filter.column, filter.value)
        }

        const { data, error } = await query;

        check(!error, error?.message || `Error select from table ${table}`, "object");

        return {
            success: true,
            data
        }
    }) as CustomResponse
}

export const insertIn = async (table: string, payload: unknown, select?: string, forRole: AllowedRoles = "user"): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        await checkUserAuthentication(forRole);

        const supabase = await createClient();

        const { data: insertData, error } = await supabase
            .from(table)
            .insert([payload])
            .select(select);

        check(!error, error?.message || `faled to insert in table ${table}`, "object")

        return {
            success: true,
            data: insertData
        }
    }) as CustomResponse
}

interface DeleteResponse {
    status: number,
    statusText: string
}

export const deleteFrom = async (table: string, rowId: string, forRole: AllowedRoles): Promise<CustomResponse<DeleteResponse>> => {
    return await withErrorHandling(async () => {
        await checkUserAuthentication(forRole);

        // check row existing
        const {data} = await selectFrom(table, "*", Roles.admin, { column: "id", value: rowId });

        check(!!data, "Error Deleting row: the specified can not be found, check your logic or permissions", "object")

        // in order to delete related files: get and delet image only if trying to delete from projects table
        if (Array.isArray(data) && data.length > 0 && (data as Project[])[0]?.image?.fileName) {
            const { image: { fileName } } = (data as Project[])[0];
    
            // delete the image related with project
            const { success: deletingImageSuccess, message } = await deleteFile("projects", "images", fileName);
            check(deletingImageSuccess, message || "Error deleting row: it appears there is an error while deleting the image", "object");
        }

        const supabase = await createClient();

        const { error, status, statusText } = await supabase
            .from(table)
            .delete()
            .eq("id", rowId);

        check(!error, "Deleting: something went wrong!, check your delete logic or your access permissions", "object");
        check(status === 204, "Deleting: something went wrong!, response status does not match the success status", "object");

        return {
            success: true,
            data: {
                status,
                statusText: statusText || ""
            }
        };

    }) as CustomResponse<DeleteResponse>;
}