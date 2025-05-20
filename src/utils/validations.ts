//! the functions in this file cannot be used in a client component, 
//! you can only use them in the server (server component, server action, api routes)



import { NextResponse } from "next/server";
import { getUser } from "./get-user";
import { Profile } from "./types/profile";
import { CustomResponse } from "./types/response";
import { logout } from "@/actions/auth";
import { AllowedRoles, Roles } from "./types/roles";



/**
 * Throws an error response or object when success is false
 * @param success 
 *      - required 
 *      - string 
 *      - pass the success statement and the function will check if it is false 
 *      - if (!success) throw {success: false, message}
 * 
 * @param message - required - string
 * @param returns - required - "response" | "object"
 * @param status - required if returns set to "response" - number
 * @throws returns === "response" ? NextResponse.json({data}, {status}) : data
 * @returns void
 */
export function check(success: boolean, message: string, returns: "response", status: number): ReturnType<typeof NextResponse.json>
export function check(success: boolean, message: string, returns: "object", status?: number): CustomResponse
export function check(success: boolean, message: string, returns: "response" | "object", status?: number): CustomResponse | ReturnType<typeof NextResponse.json> | void {
    if (!success) {
        console.error(message)

        const data = {
            success,
            message
        }

        throw returns === "response" ? NextResponse.json({ data }, { status }) : data
    }
}




/**
 * catches the error throws for better error handling
 * @param fn 
 * @returns 
 */
export const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T | CustomResponse | NextResponse> => {
    try {
        return await fn();
    } catch (error: unknown) {
        console.error("Error: ", error);

        if (error instanceof NextResponse) {
            return error;
        }

        return {
            success: false,
            message: (error as Error).message || "Unexpected error Appeared"
        }
    }
}






const allowedRoles: AllowedRoles[] = Object.values(Roles)
/**
 * this function checks the user authentication state based on the role passed to it
 * - returns an error if the passed role invalid
 * - return an error if isUserAuthenticated failed or the retuned role invalid
 * @param allowedRole "admin" | "user"
 * @returns Promise<CustomResponse | NextResponse | void>
 */
export const checkUserAuthentication = async (allowedRole: AllowedRoles): Promise<CustomResponse | NextResponse | void> =>
    await withErrorHandling(async () => {
        check(!!allowedRole || !allowedRoles.includes(allowedRole), "authorization - role must be valid 'admin' or 'user'", "object")

        // check if user is authenticated
        const { success, data } = await isUserAuthenticated();
        const role = data?.role as AllowedRoles;

        // console.log("allowed role from checkUserAuthentication function: ", allowedRole)
        check(success, "autorization - user not authenticated", "object");
        check(role === allowedRole, `checkUserAuthentication Error: ${allowedRole} user not authenticated`, "object");
    });



/**
 * helper function for checkUserAuthentication
 * - logs out the user if the returned data (user, profile) invalid or error occures when getting the user data
 * @returns Promise<CustomResponse<{ role: string }>>
 */
export const isUserAuthenticated = async (): Promise<CustomResponse<{ role: AllowedRoles }>> =>
    await withErrorHandling(async () => {
        const { success, message, data } = await getUser();
        const user = await data?.user;
        const profile = await data?.profile as Profile;

        if (!success || !user || !profile) {
            await logout(); // assuimng that all normal authenticated users have a profile
            return {
                success: false,
                message: message || "User not authenticated",
            };
        }

        return {
            success: true,
            data: {
                role: profile?.role,
            }
        };
    }) as CustomResponse<{ role: AllowedRoles }>;