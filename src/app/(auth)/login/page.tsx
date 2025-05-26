"use client";

import { login } from "@/actions/auth";
import ActionBtn from "@/components/action-btn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [error, setError] = useState<null | string>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const handleLogin = async (formData: FormData) => {
        setError(null);
        setPending(true)
        try {
            const result = await login(formData)

            if (!result.success) {
                setError(result.message || "failed to login")
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
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur">
                <div>
                    <h2 className="text-center text-3xl font-bold text-primary">
                        Sign In
                    </h2>

                    <p className="mt-2 text-center text-sm text-light">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form className="mt-8 space-y-6 text-foreground" action={handleLogin}>
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="text-center text-sm text-red-500" role="alert">{error}</p>
                        </div>
                    )}

                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                        <label htmlFor="email" className="hidden">
                            Email address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                        <label htmlFor="password" className="hidden">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                        >
                            Forgot your password?
                        </Link>

                        <Link
                            href="/auth/signup"
                            className="text-sm text-light hover:text-primary transition-colors duration-300"
                        >
                            Don&apos;t have an account? Create one
                        </Link>
                    </div>

                    <ActionBtn
                        type="submit"
                        className="w-full bg-primary/30 hover:bg-primary/40 text-foreground p-3 rounded-lg transition-all duration-300"
                        pending={pending}
                        action={{ state1: "Sign In", state2: "Signing in..." }}
                    />
                </form>
            </div>
        </div>
    )
}

