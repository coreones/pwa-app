"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { OTPKeypad } from "./keypad";

interface ResetPasswordProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function ResetBillPointPin({ setModal }: ResetPasswordProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);

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

        <div className="space-y-6 row-span-2 w-full max-w-sm mx-auto text-lg">
          <OTPKeypad otp={otp} setOtp={setOtp} />
          
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