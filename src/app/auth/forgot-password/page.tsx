"use client"

import Link from "next/link";

export default function SignUpPage() {

   const handleBack = () => {
    window.history.back();
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full grid grid-cols-1 grid-rows-3 gap-10 h-screen max-w-3xl mx-auto ">
        {/* Header */}
        <div className="row-span-1 mx-auto w-full bg-[#21A29D] p-5 rounded-b-[40px]">
          <div className="mb-8 text-xl font-bold rext-white">
            <button onClick={handleBack} className="hover:bg-alternate/20 p-2 rounded-full">
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

          <div className="text-3xl mx-auto w-fit font-bold text-whte ">
           Password Recorvery

          </div>
          <div className="flex  mx-auto w-fit items-center gap-3 text-xl max-w-md text-center">
            Enter your email and we'll send you a link to reset your password.
          </div>
        
        </div>

        {/* Form */}
        <div className="space-y-6 row-span-2 w-full flex flex-col justify-center max-w-md mx-auto text-lg">
          <div className="space-y-4">
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
              />
            </div>

        
          </div>

          <button className="w-full bg-[#21A29D] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors">
            Continue
          </button>

       

          <p className=" text-center text-gray-500">
            Back to{" "}
            <Link href="/auth/login" className="text-[#21A29D] underline">
             Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
