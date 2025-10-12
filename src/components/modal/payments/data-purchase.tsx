import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { OTPKeypad } from "../keypad";

export default function LocalPurchase() {
  const [step, setStep] = useState(1);
  const [saveBebeficiary, setSaveBeneficiary] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleSaveBeneficiary = () => {
    setSaveBeneficiary(!saveBebeficiary);
  };
  const dropdownAmount = [
    { value: 100, label: "₦100" },
    { value: 200, label: "₦200" },
    { value: 500, label: "₦500" },
    { value: 1000, label: "₦1000" },
    { value: 2000, label: "₦2000" },
    { value: 5000, label: "₦5000" },
  ];

  const purchaceData = [
    { title: "Product name", value: "Airtime" },
    { title: "Service Provider", value: "Airtel" },
    { title: "Phone Number", value: "08012345678" },
    { title: "Amount", value: "₦1200" },
  ];

  const serviceProviders = [
    { value: "airtel", name: "Airtel", imgSrc: "/svg/x.svg" },
    { value: "mtn", name: "MTN", imgSrc: "/svg/x.svg" },
    { value: "glo", name: "Glo", imgSrc: "/svg/x.svg" },
    { value: "9mobile", name: "9mobile", imgSrc: "/svg/x.svg" },
  ];

  const renderstep = () => {
    switch (step) {
      case 1:
        return (
          <div className="h-full w-full p-3 space-y-8 relative ">
            <div className=" w-full flex flex-col gap-3 relative items-start">
              <h1 className="text-lg font-semibold">Select service Provider</h1>
              <div className="w-full flex  p-3 rounded-2xl items-center">
                <button
                  onClick={handleToggleDropdown}
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

              {toggleDropdown && (
                <div className=" w-full max-w-xs absolute top-full rounded-2xl p-4 bg-[#21A29D] left-0">
                  
                  {serviceProviders.map((item, index) => (
                    <div
                    onClick={handleToggleDropdown}
                      key={index}
                      className="w-full  p-3 rounded-2xl flex items-center gap-5 hover:bg-alternate/50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full flex flex-none relative">
                        <Image
                          src={item.imgSrc}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-lg font-semibold">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
                <button
                  onClick={handleNext}
                  type="button"
                  className=" bg-alternate px-8 hover:bg-alternate/70 py-2 text-lg text-white rounded-2xl"
                >
                  Pay
                </button>
              </div>
            </div>

            <div className=" w-full bg-white  flex justify-between items-center rounded-2xl px-3 py-5">
              <h1 className=" text-xl font-semibold text-black/70 ">
                Save as Beneficiary
              </h1>
              <div
                className={`" w-20 border-2 border-primary rounded-full p-1 items-center flex ${
                  saveBebeficiary ? "justify-end " : "justify-start"
                } `}
              >
                <div
                  onClick={handleSaveBeneficiary}
                  className={`" w-8 h-8 rounded-full   ${
                    saveBebeficiary
                      ? "translate-x-0 bg-primary"
                      : "translate-x-[-2px] bg-gray-500"
                  }  transition-all duration-500 cursor-pointer `}
                ></div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full absolute top-0 left-0 min-h-full bg-black/30 z-0 flex items-end ">
            <div className=" w-full bg-white relative rounded-t-[60px] pb-20">
              <div className="w-full h-auto  p-3 mx-auto  max-w-xl  ">
                <button
                  onClick={handleBack}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <X size={30} className="absolute top-8 left-8 " />
                </button>

                <div className="flex w-fit mx-auto items-end py-10">
                  <span className="text-2xl font-bold text-primary ">₦</span>
                  <span className="text-4xl font-bold text-primary">1200</span>
                </div>

                <div className="flex flex-col   bg-alternate/10 rounded-2xl">
                  {purchaceData.map((item, index) => (
                    <div
                      key={index}
                      className="flex  justify-between px-6 py-2"
                    >
                      <span className="text-lg font-semibold text-black/70">
                        {item.title}
                      </span>
                      <span className="text-lg font-bold ">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full flex justify-center  pt-10">
                  <button
                    onClick={handleNext}
                    className="w-full max-w-sm py-4 bg-primary/80 rounded-2xl text-2xl text-white font-black "
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full absolute top-0 left-0 min-h-full z-0 bg-black/30 flex items-end ">
            <div className=" w-full bg-white relative z-10 rounded-t-[60px] pb-20">
              <div className=" max-w-lg mx-auto w-full p-3">
                <OTPKeypad
                  otp={otp}
                  setOtp={setOtp}
                  headerText="Enter your pin"
                  onclick={handleBack}
                />
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
