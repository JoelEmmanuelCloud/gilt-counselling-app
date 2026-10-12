"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Email verified successfully!");
        setTimeout(() => {
          router.push("/auth/signin?verified=true");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to verify email");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <AuthSplitLayout
      eyebrow="Gilt Counselling Consult"
      headline="Your privacy comes first."
      description="We confirm every sign-in with a one-time code so only you can access your account."
    >
      <div className="space-y-6">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="mb-6">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-gold"></div>
              </div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-gray-900 mb-2">
                Verifying your email...
              </h1>
              <p className="text-gray-600">Please wait a moment</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-gray-900 mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting you to sign in...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-gray-900 mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="block w-full py-3 px-4 bg-soft-terracotta text-gray-900 rounded-lg hover:bg-soft-terracotta/90 transition-colors font-semibold"
                >
                  Sign In to Get a New Code
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthSplitLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal mb-4"></div>
          <p className="text-gray-600">Verifying email...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
