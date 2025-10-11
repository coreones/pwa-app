import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function LocalPurchase() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const dropdownAmount = [
    { value: 100, label: "₦100" },
    { value: 200, label: "₦200" },
    { value: 500, label: "₦500" },
    { value: 1000, label: "₦1000" },
    { value: 2000, label: "₦2000" },
    { value: 5000, label: "₦5000" },
  ];

  const renderstep = () => {
    switch (step) {
      case 1:
        return (
          <div className="h-full w-full p-3 space-y-8 relative ">
            <div className=" w-full flex flex-col gap-3 items-start">
              <h1 className="text-lg font-semibold">Select service Provider</h1>
              <div className="w-full flex bg-white p-3 rounded-2xl items-center">
                <button
                  type="button"
                  className="w-fit flex items-center gap-2 border-r-2 px-2 border-gray-300 cursor-pointer "
                >
                  <div className="w-12 h-12 rounded-full flex flex-none relative">
                    <Image
                      src={"/svg/x.svg"}
                      alt="Airtel"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown size={20} />
                </button>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="XXX XXXX XXXX"
                  className="w-full text-3xl font-semibold pl-5 outline-none"
                />
              </div>
            </div>

            <div className=" w-full flex flex-col gap-3  bg-white p-3 rounded-2xl items-start">
              <h1 className="text-2xl font-black ">Topup</h1>
              <div className="grid grid-cols-3 gap-5 w-full">
                {dropdownAmount.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full bg-alternate/10 text-center py-5 border-2 border-primary/60 hover:scale-105 transition-all duration-300 shadow-sm rounded-xl font-semibold text-lg"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center w-full mt-10  border-b-2 border-primary/40 pb-2 p-2">
                <span className="text-2xl font-black">₦</span>
                 <input
                  type="text"
                  name=""
                  id=""
                  placeholder="100"
                  className="w-full text-2xl font-semibold pl-10 outline-none"
                />
                <button type="button" className=" bg-alternate px-8 hover:bg-alternate/70 py-2 text-lg text-white rounded-2xl">
                  Pay
                </button>
              </div>
            </div>

            <div className=" w-full bg-white  flex justify-between items-center rounded-2xl px-3 py-5">
                <h1 className=" text-xl font-semibold text-black/70 ">Save as Beneficiary</h1>
                <div className={`" w-20 border-2 border-primary rounded-full  flex `}>

                </div>
            </div>
          </div>
        );
      default:
        return <div>Step {step}</div>;
    }
  };

  return <div className="w-full max-w-xl mx-auto">{renderstep()}</div>;
}
