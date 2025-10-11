"use client";

import ResetPassword from "@/components/modal/reset-password";
import React, { useState } from "react";

export default function page() {
  const [activeModal, setActiveModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen text-white bg-white relative">
      <div className="mx-auto h-full relative min-h-screen grid grid-cols-1 grid-rows-12  max-w-3xl">
        <div className=" flex flex-col relative bg-[#21A29D] rounded-b-[60px] row-span-4 justify-around items-center w-full">
          <div className="mb-8 text-xl absolute left-4 top-4 font-bold rext-white">
            <button
              onClick={handleBack}
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
          {/* Header */}
          <h1 className="text-center text-2xl font-semibold w-full mb-6">
            Reset Password
          </h1>
          <div>
            <h1 className="text-white text-4xl text-center font-black">
              OTP Verification
            </h1>
            <h4 className="text-xl">
              Enter a 5 digit code sent to your email address
            </h4>
          </div>
        </div>

        <div className="w-full row-span-6 max-w-lg my-auto mx-auto">
          <div className="flex justify-between gap-2 mt-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-20 h-20 text-center border-3 text-primary border-[#21A29D] text-2xl font-semibold rounded-2xl tracking-widest  "
              />
            ))}
          </div>

          <div className="my-10 space-y-10">
            <button
              onClick={() => setActiveModal(true)}
              type="button"
              className="w-full py-5 rounded-2xl velo-gradient bg-[#21A29D] text-white font-semibold"
            >
              Continue
            </button>

            <p className="text-center text-lg text-black/80 text-muted-foreground">
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>

      {activeModal && <ResetPassword setModal={setActiveModal}/>}
    </div>
  );
}
