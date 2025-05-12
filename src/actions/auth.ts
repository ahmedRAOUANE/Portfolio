'use server';

import { getUsersProfile } from '@/utils/get-user';
import { createClient } from '@/utils/supabase/server';
import { CustomResponse } from '@/utils/types/response';
import { Routes } from '@/utils/types/routes';

export async function login(formData: FormData): Promise<CustomResponse<{ pathToRedirect: string }>> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            success: false,
            message: 'Email and password are required'
        };
    }

    try {
        // create server client
        const supabase = await createClient()

        // login user
        const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            return {
                success: false,
                message: error.message
            }
        }

        if (!user || !session) {
            return {
                success: false,
                message: "no user or session available"
            }
        }

        const { success, message, data: profile } = await getUsersProfile(user);
        if (!success || !profile) {
            return {
                success: false,
                message
            }
        }

        return {
            success: true,
            data: {
                pathToRedirect: profile.role === "admin" ? Routes.admin : Routes.home
            }
        }
    } catch (error: unknown) {
        console.error('Login error:', error);
        return {
            success: false,
            message: (error instanceof Error) ? error.message : "something went wrong, try again"
        }
    }
}

export async function logout(): Promise<CustomResponse<{ pathToRedirect: string }>> {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            return {
                success: false,
                message: error.message
            }
        }

        return {
            success: true,
            data: {
                pathToRedirect: Routes.home
            }
        }
    } catch (error: unknown) {
        console.error('Logout error:', error);
        return {
            success: false,
            message: (error instanceof Error) ? error.message : "something went wrong, try again"
        }
    }
}

// TODO: add signup and forget password logic later if needed