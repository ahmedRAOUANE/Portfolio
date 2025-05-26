"use client";

import FeatureNotEnabled from "@/components/feature-not-enabled";
import { isFeatureEnabled } from "@/utils/featureflags-service";
import Link from "next/link";
import ActionBtn from "@/components/action-btn";

export default function ForgotPasswordPage() {
  const isEnabled = isFeatureEnabled("auth")
    if (!isEnabled) return <FeatureNotEnabled />

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-light">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6">
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

          <div className="flex flex-col items-start gap-2">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
            >
              Back to Sign in
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
            action={{ state1: "Send Reset Link", state2: "Sending..." }}
          />
        </form>
      </div>
    </div>
  )
}
