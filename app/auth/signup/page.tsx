"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Step 1: Create the user account
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupData.error || "Failed to create account");
      }

      // Step 2: Send OTP to email for verification
      const otpResponse = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(otpData.message || "Failed to send verification code");
      }

      setSuccessMessage(
        "Account created! Verification code sent. Redirecting..."
      );

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}&type=signup`);
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      setErrorMessage("Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-6 px-3 sm:py-12 sm:px-4 md:px-6 lg:px-8 lg:py-16">
      <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl border border-gilt-gold/20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3">
            Get Started
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Create your Gilt Counselling account
          </p>
        </div>

        {/* Error/Success Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl">
            <p className="text-xs sm:text-sm lg:text-base">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl">
            <p className="text-xs sm:text-sm lg:text-base">{successMessage}</p>
          </div>
        )}

        {/* Google Sign Up */}
        <div>
          <button
            onClick={handleGoogleSignUp}
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
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-7">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent transition-all"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent transition-all"
                placeholder="Doe"
              />
            </div>
          </div>

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 lg:mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 text-sm sm:text-base lg:text-lg border border-gray-300 rounded-lg lg:rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent transition-all"
              placeholder="+234 800 000 0000"
            />
            <p className="mt-1 lg:mt-2 text-[10px] sm:text-xs lg:text-sm text-gray-500">
              We'll send a 6-digit verification code to your email (no password needed!)
            </p>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 lg:h-5 lg:w-5 mt-0.5 sm:mt-1 text-gilt-gold focus:ring-gilt-gold border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 lg:ml-3 block text-xs sm:text-sm lg:text-base text-gray-700">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-gilt-gold hover:text-gilt-orange transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-gilt-gold hover:text-gilt-orange transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !!successMessage}
            className="w-full flex justify-center py-2.5 sm:py-3 lg:py-4 px-4 lg:px-6 border border-transparent rounded-lg lg:rounded-xl shadow-sm text-sm sm:text-base lg:text-lg text-white bg-gradient-to-r from-gilt-gold to-gilt-orange hover:from-gilt-orange hover:to-gilt-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gilt-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isLoading
              ? "Sending verification code..."
              : successMessage
              ? "Code sent! Redirecting..."
              : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-gilt-gold hover:text-gilt-orange transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
