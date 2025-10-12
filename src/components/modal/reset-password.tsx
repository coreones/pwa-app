"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ResetPasswordProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function ResetPassword({ setModal }: ResetPasswordProps) {
  return (
    <div className="container absolute top-0 left-0 w-full bg-gray-50">
      <div className="w-full grid grid-cols-1 grid-rows-3 gap-10 h-auto">
        {/* Header */}
        <div className="row-span-1 mx-auto w-full bg-[#21A29D] p-5 rounded-b-[60px]">
          <div className="mb-8 text-xl font-bold rext-white">
            <button
              onClick={() => setModal(false)}
              className="hover:bg-alternate/20 p-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="text-4xl max-w-md text-center mx-auto w-fit font-bold text-whte ">
            Reset your password below
          </div>

        </div>

        {/* Form */}
        <div className="space-y-6 row-span-2 w-full max-w-md mx-auto text-lg">
          <div className="space-y-4">

            <div>
              <label htmlFor="NP" className="block  font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="NP"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="CNP" className="block  font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                id="CNP"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>
          </div>

          <button className="w-full bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
            Continue
          </button>

        </div>
      </div>
    </div>
  );
}
