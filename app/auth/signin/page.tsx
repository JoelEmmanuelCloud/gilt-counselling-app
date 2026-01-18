"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      setErrorMessage("Failed to sign in with Google");
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

        {/* Google Sign In */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border-2 border-gray-300 rounded-lg lg:rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base lg:text-lg"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm lg:text-base">
            <span className="px-3 sm:px-4 lg:px-5 bg-white text-gray-500">
              Or continue with email
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
