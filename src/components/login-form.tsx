"use client";

import ActionBtn from "./action-btn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Translations } from "@/utils/types/translations";

const LoginForm = ({translations}: {translations: Translations['auth']['login']['form']}) => {
    const [error, setError] = useState<null | string>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const handleLogin = async (formData: FormData) => {
        setError(null);
        setPending(true)
        try {
            const result = await login(formData)

            if (!result.success) {
                setError(result.message || translations.loginFailed)
                return;
            }

            setPending(true)
            router.push(result.data?.pathToRedirect as string)
            return;
        } catch (error: unknown) {
            setPending(false);
            if (error instanceof Error)
                console.log(`Error logining in: ${error?.message}`)

            return;
        }
    }

    return (
        <form className="mt-8 space-y-6 text-foreground" action={handleLogin}>
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-center text-sm text-red-500" role="alert">{error}</p>
                </div>
            )}

            <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                <label htmlFor="email" className="hidden">
                    {translations.email}
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    placeholder={translations.email}
                />
            </div>

            <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                <label htmlFor="password" className="hidden">
                    {translations.password}
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                    placeholder={translations.password}
                />
            </div>

            {/* This feature might be enabled in the fiture */}
            {/* <div className="flex flex-col items-start gap-2">
                <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                >
                    {translations.forgotPassword}
                </Link>

                <Link
                    href="/auth/signup"
                    className="text-sm text-light hover:text-primary transition-colors duration-300"
                >
                    {translations.register}
                </Link>
            </div> */}

            <ActionBtn
                type="submit"
                className="w-full bg-primary/30 hover:bg-primary/40 text-foreground p-3 rounded-lg transition-all duration-300"
                pending={pending}
                action={{ state1: translations.submit, state2: translations.submitting }}
            />
        </form>
    )
}

export default LoginForm;