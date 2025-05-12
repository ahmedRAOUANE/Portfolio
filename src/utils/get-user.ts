import { User } from "@supabase/supabase-js";
import { supabase as supabaseClient } from "./supabase/client";
import { createClient } from "./supabase/server";
import { CustomResponse } from "./types/response";
import { Profile } from "./types/profile";

export const getUser = async (): Promise<CustomResponse<{user: User, profile: Profile}>> => {
    const supabaseServer = await createClient();

    try {
        const { data: { user }, error: authError } = await supabaseServer.auth.getUser();

        if (authError) {
            return {
                success: false,
                message: 'Authentication error'
            };
        }

        if (!user) {
            return {
                success: false,
                message: 'No user found'
            };
        }

        const { success, message, data: profile } = await getUsersProfile(user)

        if (!success) {
            return {
                success: false,
                message
            };
        }

        return {
            success: true,
            data: {
                user,
                profile
            }
        };
    } catch (error: unknown) {
        console.error('Get user error:', error);
        return {
            success: false,
            message: (error instanceof Error) ? error.message : "something went wrong, try again"
        };
    }
}

export const getUsersProfile = async (user: User): Promise<CustomResponse<Profile>> => {
    const { data: profile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
        return {
            success: false,
            message: profileError?.message || "failed to fetch user profile",
        }
    }

    return {
        success: true,
        data: profile
    };
}