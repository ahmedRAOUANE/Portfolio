"use client";

import FeatureNotEnabled from "@/components/feature-not-enabled";
import { isFeatureEnabled } from "@/utils/featureflags-service";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const isEnabled = isFeatureEnabled("auth")
    if (!isEnabled) return <FeatureNotEnabled />

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg bg-dark">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-secondary">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="hidden">
              Email address
            </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your email"
              />
          </div>

          <div className="flex flex-col items-start gap-2">
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
                Back to Sign in
              </Link>

              <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
                Create Account
              </Link>
          </div>

            <button
              type="submit"
              className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Send Reset Link
            </button>
        </form>
      </div>
    </div>
  )
}
