"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#21A29D]/10 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl p-8 md:p-10 border border-gray-100"
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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#21A29D]">
            Welcome to BillNa 🎉
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Pay bills, buy airtime & data, send money — all in one place.
            Let’s get you started with your free account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="johndoe123"
              className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+234 801 234 5678"
              className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full text-stone-800 placeholder:text-stone-200 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21A29D] focus:border-transparent outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#21A29D]"
              >
                {showPassword ? (
                  // Hide icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.477 10.477A3 3 0 0112 9a3 3 0 013 3c0 .389-.074.76-.211 1.1M9.88 9.88A3 3 0 0115 12a3 3 0 01-3 3 3 3 0 01-2.12-.88M12 5c7.18 0 11 7 11 7s-1.5 3.06-4.39 5.26M9.88 9.88L4.21 4.21"
                    />
                  </svg>
                ) : (
                  // Show icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#1b8e89] transition-all"
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to BillNa’s{" "}
            <span className="text-[#21A29D] font-medium hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#21A29D] font-medium hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>

          <p className="mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#21A29D] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
