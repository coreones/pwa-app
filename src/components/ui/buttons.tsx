"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { Url } from "url";

export function MenuItem({
  icon,
  label,
  isRed = false,
  showBorder = true,
  onclick,
  type = "button",
  link = "#",
  amount = "0.00",
}: {
  icon: ReactNode;
  label: string;
  isRed?: boolean;
  showBorder?: boolean;
  onclick?: () => void;
  type?: "button" | "link" | "data" | undefined;
  link?: Url | string | undefined;
  amount?: number | string | undefined;
}) {
  const baseClasses =
    "w-full flex items-center justify-between gap-3 p-3 transition-all duration-200 rounded-xl hover:bg-[#21A29D]/10";
  const borderClass = showBorder ? "border-b border-stone-100" : "";
  const labelClass = `flex-1 text-[15px] font-medium ${isRed ? "text-red-500" : "text-stone-700"
    }`;

  const iconWrapper =
    "w-10 h-10 flex items-center justify-center rounded-full bg-[#21A29D]/10 text-[#21A29D] flex-shrink-0";

  const Chevron = () => (
    <svg
      className="w-5 h-5 text-stone-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  if (type === "button") {
    return (
      <button onClick={onclick} type="button" className={`${baseClasses} ${borderClass}`}>
        <div className="flex justify-start items-center gap-4 flex-row">
          <div className={iconWrapper}>{icon}</div>
          <span className={labelClass}>{label}</span>
        </div>
        <Chevron />
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link href={link || "#"} className={`${baseClasses} ${borderClass}`}>
        <div className="flex items-center gap-4 flex-1">
          <div className={iconWrapper}>{icon}</div>
          <span className={labelClass}>{label}</span>
        </div>
        <Chevron />
      </Link>
    );
  }

  if (type === "data") {
    return (
      <Link href={link || "#"} className={`${baseClasses} ${borderClass}`}>
        <div className="flex items-center gap-4 flex-1">
          <div className={iconWrapper}>{icon}</div>
          <div className="flex flex-col">
            <span className="text-stone-800 font-semibold">{label}</span>
            <span className="text-sm text-stone-500">Total Amount</span>
          </div>
        </div>
        <span className="text-stone-700 font-medium">{amount}</span>
      </Link>
    );
  }

  return null;
}

export function ToggleItem({
  icon,
  label,
  showBorder = true,
}: {
  icon: ReactNode;
  label: string;
  showBorder?: boolean;
}) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div
      className={`cursor-pointer transition-all duration-200 rounded-xl p-3 hover:bg-[#21A29D]/10 ${showBorder ? "border-b border-stone-100" : ""
        }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#21A29D]/10 text-[#21A29D] flex-shrink-0">
          {icon}
        </div>
        <span className="flex-1 text-[15px] text-stone-700 font-medium">{label}</span>
        <button
          type="button"
          onClick={() => setIsToggled(!isToggled)}
          className={`w-14 h-8 flex items-center rounded-full transition-all duration-300 ${isToggled
              ? "bg-[#21A29D]/30 justify-end"
              : "bg-stone-200 justify-start"
            } p-1`}
        >
          <div
            className={`w-6 h-6 rounded-full transition-all duration-300 ${isToggled ? "bg-[#21A29D]" : "bg-white shadow"
              }`}
          ></div>
        </button>
      </div>
    </div>
  );
}
