import { ChevronDown } from "lucide-react";
import React from "react";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg";
}
export default function Logo({ size = "sm" }: LogoProps) {
  const handleSize = () => {
    if (size === "xs") {
      return "text-xl";
    }
    if (size === "sm") {
      return "text-2xl";
    }
    if (size === "md") {
      return "text-4xl";
    }
    if (size === "lg") {
      return "text-5xl";
    }
  };
  return <div className={`w-fit flex items-center gap-2  `}>
        <div className={`bg-white rounded-full p-1 ${handleSize()}`}>
            <ChevronDown className={`${size === "xs" && "w-5 h-5"} ${size === "sm" && "w-7 h-7"} ${size === "md" && "w-9 h-9"} ${size === "lg" && "w-11 h-11"} text-primary stroke-3`}/>
        </div>
        <div className={`${handleSize()} text-secondary`}>
            CoreOnes
        </div>
  </div>;
}
