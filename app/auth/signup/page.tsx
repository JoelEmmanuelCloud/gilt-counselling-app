"use client";

import { useState } from "react";
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
      // Create account and send OTP in one request
      const response = await fetch("/api/auth/signup", {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setSuccessMessage(
        "Account created! Verification code sent. Redirecting..."
      );

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}&type=signup`);
      }, 1500);
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

        {/* Email Sign Up */}
        <div className="relative">
          <div className="relative flex justify-center text-xs sm:text-sm lg:text-base">
            <span className="px-3 sm:px-4 lg:px-5 bg-white text-gray-500">
              Sign up with your email
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
