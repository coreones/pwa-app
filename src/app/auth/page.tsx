"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="container w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#21A29D] via-[#21A29D]/10 to-[#ffffff] relative overflow-hidden py-6">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 w-full -z-10 overflow-hidden">
        <div className="absolute top-20  left-10 w-72 h-full bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-white rounded-full "></div>
      </div>

      {/* Main content */}
      <div className="w-full text-center space-y-10 pt-[120px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-[#21A29D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              BillNa
            </h1>
          </div>
          <p className="text-white/90 text-base font-medium">
            Smarter bills, simpler payments ⚡
          </p>
        </motion.div>

        {/* Hero tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl w-[90%] mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            Pay bills, and stay connected — all in one place.
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Buy airtime & data, pay electricity & TV bills, and even book flight tickets — all with BillNa. Fast,
            reliable, and built for your everyday life.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full flex flex-col gap-4 max-w-sm mx-auto p-8"
        >
          <Link href={"/auth/register"} className="w-full cursor-pointer bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-[#1b8e89] transition-all">
            Create Account
          </Link>
          <Link href={"/auth/login"} className="w-full cursor-pointer border-2 border-[#21A29D] text-[#21A29D] bg-white font-semibold py-4 px-6 rounded-xl hover:bg-[#21A29D]/5 transition-all">
            Log In
          </Link>
        </motion.div>

        {/* Extra section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="pb-12 text-gray-700 text-sm mx-auto text-center w-[80%]"
        >
          <p>
            🔒 Secure & trusted by thousands of Nigerians. Powered by
            <span className="font-semibold text-[#21A29D]"> BillNa</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
