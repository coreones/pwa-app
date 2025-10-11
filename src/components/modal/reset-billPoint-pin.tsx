"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface ResetPasswordProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function ResetBillPointPin({ setModal }: ResetPasswordProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);

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

  const handleInput = (num: number | string): void => {
    if (num === "⌫") {
      const lastFilledIndex = otp.lastIndexOf(
        otp
          .slice()
          .reverse()
          .find((d: string) => d !== "") ?? ""
      );
      if (lastFilledIndex !== -1) {
        handleChange(lastFilledIndex, "");
        const prevInput = document.getElementById(`otp-${lastFilledIndex - 1}`);
        prevInput?.focus();
      }
    } else if (num !== "") {
      const firstEmptyIndex = otp.findIndex((d: string) => d === "");
      if (firstEmptyIndex !== -1) {
        handleChange(firstEmptyIndex, num.toString());
        const nextInput = document.getElementById(`otp-${firstEmptyIndex + 1}`);
        nextInput?.focus();
      }
    }
  };

  const numPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];
  return (
    <div className="min-h-screen absolute top-0 left-0 w-full bg-gray-50">
      <div className="w-full grid grid-cols-1 grid-rows-3 gap-10 h-screen max-w-3xl mx-auto ">
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
            Create a transaction pin
            <h3 className="text-lg">
              The PIN is required to process your transactions
            </h3>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 row-span-2 w-full max-w-sm mx-auto text-lg">
          <div className="flex justify-between gap-2 mt-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-15 h-15 text-center border-3 text-primary border-[#21A29D] text-2xl font-semibold rounded-2xl tracking-widest  "
              />
            ))}
          </div>

          <div className="max-w-sm mx-auto grid grid-cols-3 gap-4 mt-10">
            {numPad.map((num, index) => (
              <button
                key={index}
                onClick={() => handleInput(num)}
                className="w-full h-15 text-primary rounded-2xl flex items-center justify-center text-2xl font-semibold hover:bg-alternate/50 transition-colors"
              >
                {num}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={otp.some((digit) => digit === "")}
            className="w-full bg-[#21A29D] disabled:bg-alternate/20 text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#21A29D]/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
