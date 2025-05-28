//! the functions in this file cannot be used in a client component, 
//! you can only use them in the server (server component, server action, api routes)



import { NextResponse } from "next/server";
import { getUser } from "./get-user";
import { Profile } from "./types/profile";
import { CustomResponse } from "./types/response";
// import { logout } from "@/actions/auth";
import { AllowedRoles, Roles } from "./types/roles";



/**
 * Throws an error response or error object when success is false
 * use only when the failed operation throws an error
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
export function checkForError(success: boolean, message: string, returns: "response", status: number): ReturnType<typeof NextResponse.json>
export function checkForError(success: boolean, message: string, returns: "object", status?: number): CustomResponse
export function checkForError(success: boolean, message: string, returns: "response" | "object", status?: number): CustomResponse | ReturnType<typeof NextResponse.json> | void {
    if (!success) {
        console.error(message)

        const data = {
            success,
            message
        }

        throw returns === "response" ? NextResponse.json({ data }, { status }) : new Error(data.message)
        // throw returns === "response" ? NextResponse.json({ data }, { status }) : data
    }
}




/**
 * catches the error throws for better error handling
 * @param fn 
 * @returns 
 */
export const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T | NextResponse | Error> => {
    try {
        return await fn();
    } catch (error: unknown) {
        console.error("Error: ", error);

        const data = {
            success: false,
            message: error instanceof Error ? error.message : error
        }

        if (error instanceof NextResponse) {
            return NextResponse.json(data, { status: error.status });
        } else if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw data
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
export const checkUserAuthentication = async (allowedRole: AllowedRoles): Promise<CustomResponse | NextResponse | void> => {
    checkForError(!!allowedRole || !allowedRoles.includes(allowedRole), "authorization > checkUserAuthentication > validation - role must be valid 'admin' or 'user'", "object")

    // check if user is authenticated
    const { success, data, message } = await isUserAuthenticated();
    const role = data?.role as AllowedRoles;

    checkForError(success, `authorization Error > checkUserAuthentication > isUserAuthenticated: ${message || "user not authenticated"}`, "object");
    checkForError(role === allowedRole, `autorization Error > checkUserAuthentication: ${allowedRole} not authenticated`, "object");
    // return await withErrorHandling(async () => {
    // }) as CustomResponse | NextResponse | void;
}


/**
 * helper function for checkUserAuthentication
 * - logs out the user if the returned data (user, profile) invalid or error occures when getting the user data
 * @returns Promise<CustomResponse<{ role: string }>>
 */
export const isUserAuthenticated = async (): Promise<CustomResponse<{ role: AllowedRoles }>> => {
    const { success, message, data: userData } = await getUser();
    const profile = await userData?.profile as Profile;

    checkForError(success, `isUserAuthenticated Error: ${message || "user not authenticated"}`, "object");

    if (!userData) {
        // await logout(); // assuimng that all normal authenticated users have a profile
        return {
            success: true,
            message: "user not authenticated"
        };
    }

    return {
        success: true,
        data: {
            role: profile?.role,
        }
    };
    // return await withErrorHandling(async () => {
    // }) as CustomResponse<{ role: AllowedRoles }>;
}
