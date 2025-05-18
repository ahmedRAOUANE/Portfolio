'use server';

import { getUsersProfile } from '@/utils/get-user';
import { createClient } from '@/utils/supabase/server';
import { CustomResponse } from '@/utils/types/response';
import { Roles } from '@/utils/types/roles';
import { Routes } from '@/utils/types/routes';
import { check, withErrorHandling } from '@/utils/validations';

export async function login(formData: FormData): Promise<CustomResponse<{ pathToRedirect: string }>> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    check(!!email && !!password, "Email and Password are requied", "object")

    return await withErrorHandling(async () => {
        // create server client
        const supabase = await createClient()

        // login user
        const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        check(!error, error?.message || "Error logging in", "object")

        check(!!user || !!session, "no user or session is available", "object")

        const { success, message, data: profile } = await getUsersProfile(user!);
        check(success || !!profile, message || "failed to get user profile", "object")

        return {
            success: true,
            data: {
                pathToRedirect: profile!.role === Roles.admin ? Routes.admin : Routes.home
            }
        }
    }) as CustomResponse<{ pathToRedirect: string }>
}

export async function logout(): Promise<CustomResponse<{ pathToRedirect: string }>> {
    return await withErrorHandling(async () => {
        const supabase = await createClient();

        const { error } = await supabase.auth.signOut();

        check(!error, error?.message || "Error logging user out", "object");

        return {
            success: true,
            data: {
                pathToRedirect: Routes.home
            }
        }
    }) as CustomResponse<{ pathToRedirect: string }>
}

// TODO: add signup and forget password logic later if needed