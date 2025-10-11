"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface OTPKeypadProps {
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  headerText?: string;
  onclick?: () => void;
}

export function OTPKeypad({ otp, setOtp, headerText, onclick }: OTPKeypadProps) {
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeypadInput = (num: number | string): void => {
    if (num === "⌫") {
      const lastFilledIndex = otp.lastIndexOf(
        otp
          .slice()
          .reverse()
          .find((d: string) => d !== "") ?? ""
      );
      if (lastFilledIndex !== -1) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = "";
        setOtp(newOtp);
        const prevInput = document.getElementById(`otp-${lastFilledIndex - 1}`);
        prevInput?.focus();
      }
    } else if (num !== "") {
      const firstEmptyIndex = otp.findIndex((d: string) => d === "");
      if (firstEmptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[firstEmptyIndex] = num.toString();
        setOtp(newOtp);
        const nextInput = document.getElementById(`otp-${firstEmptyIndex + 1}`);
        nextInput?.focus();
      }
    }
  };

  const numPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];

  return (
    <div className="space-y-6 relative">
      <button type="button" onClick={onclick} className="p-2 rounded-full hover:bg-alternate/10"><X size={20}/></button>
      <h1 className="text-2xl text-center font-semibold pt-2">{headerText}</h1>
      <div className="flex justify-between max-w-xs mx-auto gap-2 mt-10">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-15 h-15 text-center border-3 text-primary border-[#21A29D] text-2xl font-semibold rounded-2xl tracking-widest"
          />
        ))}
      </div>

      <div className="max-w-sm mx-auto grid grid-cols-3 gap-4 mt-10">
        {numPad.map((num, index) => (
          <button
            key={index}
            onClick={() => handleKeypadInput(num)}
            className="w-full h-15 text-primary rounded-2xl flex items-center justify-center text-2xl font-semibold hover:bg-alternate/50 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
