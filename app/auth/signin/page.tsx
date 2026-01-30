"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOTPSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code");
      }

      // Redirect to OTP verification page
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}&type=signin`);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-6 px-3 sm:py-12 sm:px-4 md:px-6 lg:px-8 lg:py-16">
      <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl border border-gilt-gold/20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Sign in to Gilt Counselling Consult
          </p>
        </div>

        {/* Error Message */}
        {(errorMessage || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl">
            <p className="text-xs sm:text-sm lg:text-base">
              {errorMessage ||
                (error === "OAuthAccountNotLinked"
                  ? "Email already registered with different provider"
                  : "Authentication error. Please try again.")}
            </p>
          </div>
        )}

        {/* Email Sign In */}
        <div className="relative">
          <div className="relative flex justify-center text-xs sm:text-sm lg:text-base">
            <span className="px-3 sm:px-4 lg:px-5 bg-white text-gray-500">
              Sign in with your email
            </span>
          </div>
        </div>

        {/* OTP Email Form */}
        <form onSubmit={handleOTPSignIn} className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-7">
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            <p className="mt-1 sm:mt-2 lg:mt-3 text-[10px] sm:text-xs lg:text-sm text-gray-500">
              We'll send you a 6-digit verification code
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 sm:py-3 lg:py-4 px-4 lg:px-6 border border-transparent rounded-lg lg:rounded-xl shadow-sm text-sm sm:text-base lg:text-lg text-white bg-gradient-to-r from-gilt-gold to-gilt-orange hover:from-gilt-orange hover:to-gilt-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gilt-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isLoading ? "Sending verification code..." : "Send Verification Code"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">
            New to Gilt Counselling?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-gilt-gold hover:text-gilt-orange transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Admin Login Link */}
        <div className="pt-3 sm:pt-4 lg:pt-5 border-t border-gray-200">
          <p className="text-center text-[10px] sm:text-xs lg:text-sm text-gray-500">
            Are you an admin?{" "}
            <Link
              href="/auth/admin-login"
              className="font-medium text-gilt-teal hover:text-gilt-green transition-colors"
            >
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal mb-4"></div>
          <p className="text-gray-600">Loading sign in...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
