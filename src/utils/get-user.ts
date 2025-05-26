import { User } from "@supabase/supabase-js";
import { supabase as supabaseClient } from "./supabase/client";
import { createClient } from "./supabase/server";
import { CustomResponse } from "./types/response";
import { Profile } from "./types/profile";
import { checkForError, withErrorHandling } from "./validations";

export const getUser = async (): Promise<CustomResponse<{ user: User; profile: Profile }>> => {
    return await withErrorHandling(async () => {
        const supabaseServer = await createClient();

        const { data: { user } } = await supabaseServer.auth.getUser();

        if (!user) {
            return {
                success: true,
                data: null
            }
        }

        const { success, message, data: profile } = await getUsersProfile(user!);

        checkForError(success, `Authentication Error - getUser: ${message || "can not get User Profile"}`, "object");

        return {
            success: true,
            data: {
                user: user!,
                profile: profile as Profile
            }
        };
    }) as CustomResponse<{ user: User; profile: Profile }>;
}

export const getUsersProfile = async (user: User): Promise<CustomResponse<Profile>> =>
    await withErrorHandling(async () => {
        const { data: profile, error: profileError } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        checkForError(!!profileError || !!profile, profileError?.message || "failed to fetch user profile!", "object");

        return {
            success: true,
            data: profile
        };
    }) as CustomResponse<Profile>;
