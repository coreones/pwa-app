"use client";

import {
  Bus,
  CardSim,
  ChartNoAxesColumn,
  Eye,
  Gift,
  LayoutDashboard,
  Lightbulb,
  Plane,
  Smartphone,
  Sun,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const items = [
    {
      name: "Airtime",
      icon: <Smartphone className="text-primary sm:text-2xl" />,
      tag: "",
      link: "/app/payments/airtime",
    },
    {
      name: "Data",
      icon: <Wifi className="text-primary sm:text-2xl" />,
      tag: "",
    },
    {
      name: "Electricity",
      icon: <Lightbulb className="text-primary sm:text-2xl" />,
      tag: "",
    },
    {
      name: "Flight",
      icon: <Plane className="text-primary sm:text-2xl" />,
      tag: "5% off",
    },
    {
      name: "Internet",
      icon: <Wifi className="text-primary sm:text-2xl" />,
      tag: "",
    },
    {
      name: "E-Sim",
      icon: <CardSim className="text-primary sm:text-2xl" />,
      tag: "",
    },
    {
      name: "Gift Card",
      icon: <Gift className="text-primary sm:text-2xl" />,
      tag: "Best rate",
    },
    {
      name: "Transport",
      icon: <Bus className="text-primary sm:text-2xl" />,
      tag: "",
    },
    {
      name: "More",
      icon: <LayoutDashboard className="text-primary sm:text-2xl" />,
      tag: "",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    <div
      key={1}
      className="bg-black relative overflow-hidden flex-none text-white w-full rounded-2xl py-10 px-8 flex flex-col justify-start items-start gap-1.5"
    >
      <div className="absolute w-32 h-32 top-0 -right-5 rounded-full bg-gray-400/10"/>
      <h2 className="text-3xl font-black text-white">Hello Tali!</h2>
      <p className="w-[90%] font-normal text-xl text-gray-200">Welcome back, get 5% off on your first flight.</p>
    </div>,
    <div
      key={2}
      className="bg-amber-800 relative flex-none text-white w-full rounded-2xl py-10 px-8 flex flex-col justify-start items-start gap-1.5"
    >
      <div className="absolute w-32 h-32 top-0 -right-5 rounded-full bg-amber-400/10"/>
      <h2 className="text-3xl font-black text-white">Hello Tali!</h2>
      <p className="w-[90%] font-normal text-xl text-amber-200">Welcome back, get 5% off on your first flight.</p>
    </div>,
    <div
      key={3}
      className="bg-teal-800 relative flex-none text-white w-full rounded-2xl py-10 px-8 flex flex-col justify-start items-start gap-1.5"
    >
      <div className="absolute w-32 h-32 top-0 -right-5 rounded-full bg-teal-400/10"/>
      <h2 className="text-3xl font-black text-white">Hello Tali!</h2>
      <p className="w-[90%] font-normal text-xl text-teal-200">Welcome back, get 5% off on your first flight.</p>
    </div>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="grid grid-cols-1 grid-rows-10  relative gap-10 h-screen w-full max-w-3xl mx-auto overflow-y-scroll">
        {/* Header */}
        <div className=" row-span-3 bg-[#21A29D] py-5  px-10 flex items-start justify-between flex-col rounded-b-[60px] relative">
          <div className="flex w-full items-center gap-4">
            <div className="w-16 h-16 relative rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
              <Image
                src="/img/user.png"
                alt="Profile"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl font-semibold">Tali Nanzing</h2>
              <p className="text-white text-sm">talinanzing111@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 cursor-pointer rounded-full bg-white flex flex-none ">
                <ChartNoAxesColumn size={20} color="black" />
              </button>
              <button className="p-2 cursor-pointer rounded-full bg-white flex-none flex items-center justify-center">
                <Sun size={20} color="black" />
              </button>
            </div>
          </div>

          <div className="flex items-center w-full max-w-xl mx-auto justify-between pb-5">
            <div className="flex items-center gap-3 ">
              <div className="text-3xl font-black ">
                <span>N</span>
                <span>0.00</span>
              </div>
              <button className="cursor-pointer  ">
                <Eye size={30} fill="black" />
              </button>
            </div>
            <button className="text-black py-2 px-8 rounded-2xl text-lg bg-white">
              History
            </button>
          </div>

          <div className="max-w-xl mx-auto w-full">
            <button className="bg-white rounded-2xl text-black  py-2 px-6  ring-offset-2 font-black  cursor-pointer">
              Add Money
            </button>
          </div>
        </div>

        <div className=" row-span-7 p-6 max-w-xl mx-auto w-full overflow-y-scroll  space-y-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {items.map((item, index) => (
              <Link
                href={item.link || "#"}
                key={index}
                className="flex relative justify-between h-full items-center flex-col p-2 sm:p-4 space-y-4 bg-white rounded-2xl"
              >
                <div className="bg-alternate/10 rounded-full p-2 sm:p-4 w-fit">
                  {item.icon}
                </div>

                <div className="sm:text-lg text-sm font-semibold text-black/80">
                  {item.name}
                </div>

                {item.tag && (
                  <div className="absolute z-10 top-0 right-0 bg-red-500 rounded-2xl px-2 py-1 text-xs text-white">
                    {item.tag}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="w-full flex justify-center mb-20 overflow-hidden">
            <div className="relative w-full ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  {slides[currentIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
