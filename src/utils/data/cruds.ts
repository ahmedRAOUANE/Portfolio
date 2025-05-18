import { check, checkUserAuthentication, withErrorHandling } from "../validations";
import { createClient } from "../supabase/server";
import { CustomResponse } from "../types/response";
import { AllowedRoles } from "../types/roles";

export const selectFrom = async (table: string, select?: string, forRole?: AllowedRoles): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        await checkUserAuthentication(forRole!)

        const supabase = await createClient();

        const { data, error } = await supabase
            .from(table)
            .select(select);

        check(!error, error?.message || `Error select from table ${table}`, "object");

        return {
            success: true,
            data
        }
    }) as CustomResponse
}

export const insertIn = async (table: string, payload: unknown, select?: string, forRole?: AllowedRoles): Promise<CustomResponse> => {
    return await withErrorHandling(async () => {
        await checkUserAuthentication(forRole!);

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