"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function AdminAcceptContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [step, setStep] = useState<"verify" | "create">("verify");
  const [isVerifying, setIsVerifying] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid invitation link");
      setIsVerifying(false);
      return;
    }

    verifyInvite(token);
  }, [token]);

  const verifyInvite = async (token: string) => {
    try {
      const response = await fetch(
        `/api/auth/admin-verify-invite?token=${token}`
      );
      const data = await response.json();

      if (response.ok) {
        setInviteData(data);
        setStep("create");
      } else {
        setErrorMessage(data.error || "Invalid or expired invitation");
      }
    } catch (error) {
      setErrorMessage("Failed to verify invitation");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/admin-accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin account");
      }

      // Automatically sign in the new admin
      const result = await signIn("credentials", {
        email: inviteData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/admin");
      } else {
        router.push("/auth/signin?admin=created");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-gilt-gold/20 text-center">
          <div className="mb-6">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying invitation...
          </h1>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (errorMessage && !inviteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-gilt-gold/20">
          <div className="text-center">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Invalid Invitation
            </h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <Link
              href="/auth/signin"
              className="block w-full py-3 px-4 bg-gradient-to-r from-gilt-gold to-gilt-orange text-white rounded-lg hover:from-gilt-orange hover:to-gilt-gold transition-all font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-gilt-teal/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gilt-teal/10 mb-4">
            <svg
              className="w-10 h-10 text-gilt-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Admin Account
          </h1>
          <p className="text-gray-600">
            Complete your admin account setup
          </p>
          {inviteData && (
            <p className="text-sm text-gilt-teal mt-2">
              Email: <strong>{inviteData.email}</strong>
            </p>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && inviteData && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-teal focus:border-transparent transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-teal focus:border-transparent transition"
              placeholder="+234 800 000 0000"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-teal focus:border-transparent transition"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              Minimum 8 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gilt-teal focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-gilt-teal to-gilt-green hover:from-gilt-green hover:to-gilt-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gilt-teal disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isLoading ? "Creating account..." : "Create Admin Account"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            By creating an admin account, you agree to maintain confidentiality
            and handle client data responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminAcceptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gilt-teal/10 via-white to-gilt-gold/10 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-gilt-gold/20 text-center">
          <div className="mb-6">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gilt-teal"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <AdminAcceptContent />
    </Suspense>
  );
}
