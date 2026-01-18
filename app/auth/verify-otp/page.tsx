"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signin"; // "signin" or "signup"

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP expiration
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Resend cooldown timer (60 seconds)
  useEffect(() => {
    if (resendCooldown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setErrorMessage("");
      inputRefs.current[5]?.focus();

      // Auto-submit after paste
      handleSubmit(pastedData);
    }
  };

  // Handle OTP verification
  const handleSubmit = async (code?: string) => {
    const otpCode = code || otp.join("");

    if (otpCode.length !== 6) {
      setErrorMessage("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: otpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // If signup, update user profile with stored data
      if (type === "signup") {
        const signupData = localStorage.getItem("signupData");
        if (signupData) {
          try {
            const { firstName, lastName, phone } = JSON.parse(signupData);
            // Update user profile with firstName, lastName and phone
            await fetch("/api/user/profile", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.token}`,
              },
              body: JSON.stringify({ firstName, lastName, phone }),
            });
            // Clear signup data
            localStorage.removeItem("signupData");
          } catch (profileError) {
            console.error("Failed to update profile:", profileError);
            // Continue anyway - user can update profile later
          }
        }
      }

      setSuccessMessage("Verification successful! Redirecting...");

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/account");
        }
      }, 1500);
    } catch (error: any) {
      setErrorMessage(error.message || "Verification failed. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend code");
      }

      setSuccessMessage("New verification code sent!");
      setTimeRemaining(600); // Reset timer
      setCanResend(false);
      setResendCooldown(60); // 60 second cooldown
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  // Redirect if no email provided
  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-6 px-3 sm:py-12 sm:px-4">
        <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gilt-gold/20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Request</h1>
          <p className="text-gray-600 mb-6">No email address provided.</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-gradient-to-r from-gilt-gold to-gilt-orange text-white rounded-lg font-medium hover:from-gilt-orange hover:to-gilt-gold transition-all"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-6 px-3 sm:py-12 sm:px-4 md:px-6 lg:px-8 lg:py-16">
      <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl border border-gilt-gold/20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3">
            Verify Your Email
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-gilt-gold mt-1">
            {email}
          </p>
        </div>

        {/* Timer */}
        {timeRemaining > 0 ? (
          <div className="text-center">
            <p className="text-xs sm:text-sm lg:text-base text-gray-500">
              Code expires in{" "}
              <span className={`font-medium ${timeRemaining < 60 ? "text-red-500" : "text-gilt-gold"}`}>
                {formatTime(timeRemaining)}
              </span>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs sm:text-sm lg:text-base text-red-500 font-medium">
              Code has expired. Please request a new one.
            </p>
          </div>
        )}

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

        {/* OTP Input */}
        <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading || !!successMessage}
              className="w-10 h-12 sm:w-12 sm:h-14 lg:w-14 lg:h-16 text-center text-xl sm:text-2xl lg:text-3xl font-bold border-2 border-gray-300 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-gilt-gold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading || otp.some((d) => !d) || !!successMessage}
          className="w-full flex justify-center py-2.5 sm:py-3 lg:py-4 px-4 lg:px-6 border border-transparent rounded-lg lg:rounded-xl shadow-sm text-sm sm:text-base lg:text-lg text-white bg-gradient-to-r from-gilt-gold to-gilt-orange hover:from-gilt-orange hover:to-gilt-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gilt-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : successMessage ? (
            "Success! Redirecting..."
          ) : (
            "Verify Code"
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={!canResend || isResending || !!successMessage}
            className="text-sm sm:text-base font-medium text-gilt-gold hover:text-gilt-orange disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? (
              "Sending..."
            ) : !canResend && resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              "Resend Code"
            )}
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-3 sm:pt-4 lg:pt-5 border-t border-gray-200">
          <Link
            href={type === "signup" ? "/auth/signup" : "/auth/signin"}
            className="text-xs sm:text-sm lg:text-base text-gray-500 hover:text-gilt-gold transition-colors"
          >
            ← Back to {type === "signup" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
