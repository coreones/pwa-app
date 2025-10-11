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
  amount =" 0.00",
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
  return (
    <>
      {type === "button" && (
        <button
          onClick={onclick}
          type="button"
          className={` w-full  flex items-center cursor-pointer hover:bg-[#21A29D] pr-2 rounded-2xl transition-all duration-300 ${
            showBorder ? "border-b border-gray-800" : ""
          }`}
        >
          <div className="flex w-full justify-start text-start items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <span
              className={`flex-1 ${
                isRed ? "text-red-500" : "text-white"
              } text-base`}
            >
              {label}
            </span>
          </div>
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
      {type === "link" && (
        <Link
          href={link}
          className={` w-full  flex items-center cursor-pointer hover:bg-[#21A29D] pr-2 rounded-2xl transition-all duration-300 ${
            showBorder ? "border-b border-gray-800" : ""
          }`}
        >
          <div className="flex w-full justify-start text-start items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <span
              className={`flex-1 ${
                isRed ? "text-red-500" : "text-white"
              } text-base`}
            >
              {label}
            </span>
          </div>
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
      {type === "data" && (
        <Link
          href={link}
          className={` w-full  flex items-center cursor-pointer hover:bg-[#21A29D] pr-2 rounded-2xl transition-all duration-300 ${
            showBorder ? "border-b border-gray-800" : ""
          }`}
        >
          <div className="flex w-full justify-start text-start items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <span
              className={`flex-col ${
                isRed ? "text-red-500" : "text-white"
              } text-base flex`}
            >
              <span className="font-bold">{label}</span>
              <span className="text-sm">Total Amont</span>
            </span>
          </div>

          <span>{amount}</span>
        </Link>
      )}
    </>
  );
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

  const handleToggle = (label: string) => {
    setIsToggled(!isToggled);
  };
  return (
    <div
      className={`${
        showBorder ? "border-b border-gray-800" : ""
      } cursor-pointer hover:bg-[#21A29D] pr-2 rounded-2xl transition-all duration-300 `}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="flex-1 text-white text-base">{label}</span>
        <button
          type="button"
          onClick={() => handleToggle(label)}
          className={`${
            isToggled ? "justify-end" : "justify-start"
          } items-center px-1  w-14 h-8 bg-white rounded-full relative flex `}
        >
          <div
            className={`  w-6 h-6 ${
              isToggled ? "bg-[#21A29D]" : "bg-gray-800"
            }  rounded-full`}
          ></div>
        </button>
      </div>
    </div>
  );
}
