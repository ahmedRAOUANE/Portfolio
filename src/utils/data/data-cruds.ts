import { checkForError as check, checkUserAuthentication, withErrorHandling } from "../validations";
import { createClient } from "../supabase/server";
import { CustomResponse } from "../types/response";
import { AllowedRoles, Roles } from "../types/roles";
import { Project } from "../types/project";
import { deleteFile } from "./files-cruds";
import { FilterOptions } from "../types/filter";

export const selectFrom = async <T>(table: string, select: string, forRole: AllowedRoles, filter?: FilterOptions, limit?: number): Promise<CustomResponse<T>> => {
    return await withErrorHandling(async () => {
        check(!!table && !!select && !!forRole, "Selection Error > validation: Some required parameters are invalid", "object")
        
        if (forRole !== Roles.anone) {
            await checkUserAuthentication(forRole)
        }

        const supabase = await createClient()

        let query = supabase
            .from(table)
            .select(select ? select : "*");

        if (filter) {
            query = query.eq(filter.column, filter.value)
        }

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query;

        check(!error, `selection Error > selectFrom ${table}: ${error?.message || "Error select from table"}`, "object");

        return {
            success: true,
            data
        }
    }) as CustomResponse<T>;
}

export const insertIn = async <T>(table: string, payload: unknown, select: string, forRole: AllowedRoles): Promise<CustomResponse<T>> => {
    return await withErrorHandling(async () => {
        check(!!table && !!payload && !!select && !!forRole, `insertion Error > insertIn > validation: some required parameters are missing`, "object")

        if (forRole !== Roles.anone) {
            await checkUserAuthentication(forRole);
        }

        const supabase = await createClient();

        const { data: insertData, error } = await supabase
            .from(table)
            .insert([payload])
            .select(select);

        check(!error, `insertion Error > insertIn ${table}: ${error?.message || "faled to insert in table"}`, "object")

        return {
            success: true,
            data: insertData as T
        }
    }) as CustomResponse<T>;
}

interface DeleteResponse {
    status: number,
    statusText: string
}

export const deleteFrom = async (table: string, rowId: string, forRole: AllowedRoles): Promise<CustomResponse<DeleteResponse>> => {
    return await withErrorHandling(async () => {
        check(!!table && !!rowId && !!forRole, `deleting Error > deletFrom > validation: some required parameters are invalid!`, "object");

        await checkUserAuthentication(forRole);

        // check row existing
        const {data} = await selectFrom(table, "*", Roles.admin, { column: "id", value: rowId });

        check(!!data, "deleting Error > deletFrom: the specified can not be found, check your logic or permissions", "object")

        // in order to delete related files: get and delet image only if trying to delete from projects table
        if (Array.isArray(data) && data.length > 0 && (data as Project[])[0]?.image?.fileName) {
            const { image: { fileName } } = (data as Project[])[0];
    
            // delete the image related with project
            const { success: deletingImageSuccess, message } = await deleteFile("projects", "images", fileName);
            check(deletingImageSuccess, `deleting Error > deleteFrom: ${message || "it appears there is an error while deleting the image"}`, "object");
        }

        const supabase = await createClient();

        const { error, status, statusText } = await supabase
            .from(table)
            .delete()
            .eq("id", rowId);

        check(!error, "Deleting Error: something went wrong!, check your delete logic or your access permissions", "object");
        check(status === 204, "Deleting Error: something went wrong!, response status does not match the success status", "object");

        return {
            success: true,
            data: {
                status,
                statusText: statusText || ""
            }
        };

    }) as CustomResponse<DeleteResponse>;
}

export const updateIn = async (table: string, payload: unknown, forRole: AllowedRoles, filter: FilterOptions): Promise<CustomResponse<string>> => {
    return await withErrorHandling(async () => {
        // validate filter
        check(!!table || !!payload || !!forRole || !!filter, "Update Error > updateIn > validation: some required parameters are invalid", "object");

        await checkUserAuthentication(forRole);

        // check the row exists
        const { success, message } = await selectFrom(table, "*", forRole, filter);
        check(success, message || "Update Error > selectFrom: The row you are trying to update can not be found", "object");

        // update
        const supabase = await createClient();

        const { error } = await supabase.from(table).update(payload).eq(filter!.column, filter!.value)
        check(!error, `update Error: ${error?.message || "an unknown error appeard while updaing.."}`, "object");

        return {
            success: true,
            data: "Update have been successfully completed"
        }
    }) as CustomResponse<string>
}