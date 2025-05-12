"use client";

import FeatureNotEnabled from "@/components/feature-not-enabled";
import { isFeatureEnabled } from "@/utils/featureflags-service";
import Link from "next/link";

export default function SignupPage() {
  const isEnabled = isFeatureEnabled("auth")
  if (!isEnabled) return <FeatureNotEnabled />

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg bg-dark">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Create Account
          </h2>

          <p className="mt-2 text-center text-sm text-secondary">
            Join us and start creating amazing things!
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="hidden">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>

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

          <div>
            <label htmlFor="password" className="hidden">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="hidden">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
              Already have an account? Sign in
            </Link>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}
