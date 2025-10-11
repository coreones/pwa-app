"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#21A29D]/10 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl p-8"
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

        {/* Card */}
        <div className="bg-transparent space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Password Recovery
            </h2>
            <p className="text-gray-500 text-sm">
              Enter your email address and we’ll send you a link to reset your
              password.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-[#21A29D] text-white font-semibold py-3 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
            Send Reset Link
          </button>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-[#21A29D] font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
