"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#21A29D]/10 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl p-8 md:p-10"
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 text-gray-500 hover:text-[#21A29D] flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Log in to your BillNa account and continue managing your bills with ease.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.866 11.866 0 013.09-4.59m3.64-2.44A9.993 9.993 0 0112 5c5 0 9.27 3.11 11 7.5a11.873 11.873 0 01-4.358 5.319M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18M10.477 10.477A3 3 0 0114.12 14.12M9.88 9.88a3 3 0 104.24 4.24M3.98 8.223A10.05 10.05 0 0112 5c5 0 9.27 3.11 11 7.5a11.873 11.873 0 01-2.386 3.592M9.88 9.88L3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-[#21A29D] text-sm font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#1b8e89] transition-all"
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[#21A29D] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
