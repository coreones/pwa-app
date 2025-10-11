"use client";

import React, { useState, useRef } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ChangePin from "./modal/ChangePinModal";

export default function Page() {
  const [activeModal, setActiveModal] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, otp.length).split("");
    if (pastedData.every((char) => /^[0-9]$/.test(char))) {
      setOtp(pastedData);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-100 text-stone-900 relative">
      <div className="mx-auto h-full grid grid-cols-1 grid-rows-12 max-w-3xl">
        {/* Header Section */}
        <div className="relative flex flex-col bg-[#21A29D] text-white rounded-b-[60px] row-span-4 justify-center items-center px-6">
          <button
            onClick={handleBack}
            className="absolute left-6 top-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold">OTP Verification</h1>
            <p className="text-white/90 max-w-sm text-lg font-medium">
              Enter the 5-digit code sent to your email
            </p>
          </div>
        </div>

        {/* OTP Inputs */}
        <div className="row-span-6 flex flex-col justify-center items-center px-6">
          <div className="flex justify-center gap-3 md:gap-5 mt-10 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold border-2 border-stone-300 focus:border-[#21A29D] focus:ring-2 focus:ring-[#21A29D]/30 rounded-2xl transition-all bg-white shadow-sm"
              />
            ))}
          </div>

          {isOtpComplete && (
            <button
              onClick={() => setActiveModal(true)}
              type="button"
              className="mt-6 w-full max-w-md py-4 rounded-2xl bg-[#21A29D] hover:bg-[#1c908c] text-white font-semibold text-lg transition-colors shadow-md"
            >
              Continue
            </button>
          )}

          <p className="text-center mt-8 text-stone-600 text-base">
            Didn’t receive the code?{" "}
            <button
              type="button"
              className="text-[#21A29D] font-semibold hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>

      {activeModal && <ChangePin setModal={setActiveModal} />}
    </div>
  );
}
