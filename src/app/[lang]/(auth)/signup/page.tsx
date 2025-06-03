"use client";

import FeatureNotEnabled from "@/components/feature-not-enabled";
import { isFeatureEnabled } from "@/utils/featureflags-service";
import Link from "next/link";
import ActionBtn from "@/components/action-btn";

export default function SignupPage() {
  const isEnabled = isFeatureEnabled("auth")
  if (!isEnabled) return <FeatureNotEnabled />

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary">
            Create Account
          </h2>

          <p className="mt-2 text-center text-sm text-light">
            Join us and start creating amazing things!
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
            <label htmlFor="name" className="hidden">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
              placeholder="Enter your full name"
            />
          </div>

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
              autoComplete="new-password"
              className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
              placeholder="Enter your password"
            />
          </div>

          <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
            <label htmlFor="confirmPassword" className="hidden">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
            >
              Already have an account? Sign in
            </Link>
          </div>

          <ActionBtn
            type="submit"
            className="w-full bg-primary/30 hover:bg-primary/40 text-foreground p-3 rounded-lg transition-all duration-300"
            action={{ state1: "Create Account", state2: "Creating..." }}
          />
        </form>
      </div>
    </div>
  )
}
