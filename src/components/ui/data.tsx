import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { OTPKeypad } from "../keypad";

export default function LocalPurchase() {
  const [step, setStep] = useState(1);
  const [saveBebeficiary, setSaveBeneficiary] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selectedDuretion, setSelectedDuration] = useState("Daily");

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

  const purchaceData = [
    {
      timeFrame: "Daily",
      plans: [
        { data: "1GB", price: "₦100", duration: "1day" },
        { data: "2GB", price: "₦200", duration: "1day" },
        { data: "5GB", price: "₦500", duration: "1day" },
        { data: "10GB", price: "₦1000", duration: "1day" },
        { data: "20GB", price: "₦2000", duration: "1day" },
        { data: "50GB", price: "₦5000", duration: "1day" },
      ],
    },
    {
      timeFrame: "2 days",
      plans: [
        { data: "1GB", price: "₦150", duration: "2days" },
        { data: "2GB", price: "₦300", duration: "2days" },
        { data: "5GB", price: "₦750", duration: "2days" },
        { data: "10GB", price: "₦1500", duration: "2days" },
        { data: "20GB", price: "₦3000", duration: "2days" },
        { data: "50GB", price: "₦7500", duration: "2days" },
      ],
    },
    {
      timeFrame: "Weekly",
      plans: [
        { data: "1GB", price: "₦300", duration: "7days" },
        { data: "2GB", price: "₦600", duration: "7days" },
        { data: "5GB", price: "₦1500", duration: "7days" },
        { data: "10GB", price: "₦3000", duration: "7days" },
        { data: "20GB", price: "₦6000", duration: "7days" },
        { data: "50GB", price: "₦15000", duration: "7days" },
      ],
    },
    {
      timeFrame: "Monthly",
      plans: [
        { data: "1GB", price: "₦1000", duration: "30days" },
        { data: "2GB", price: "₦2000", duration: "30days" },
        { data: "5GB", price: "₦5000", duration: "30days" },
        { data: "10GB", price: "₦10000", duration: "30days" },
        { data: "20GB", price: "₦20000", duration: "30days" },
        { data: "50GB", price: "₦50000", duration: "30days" },
      ],
    },
    {
      timeFrame: "Yearly",
      plans: [
        { data: "1GB", price: "₦10000", duration: "365days" },
        { data: "2GB", price: "₦20000", duration: "365days" },
        { data: "5GB", price: "₦50000", duration: "365days" },
        { data: "10GB", price: "₦100000", duration: "365days" },
        { data: "20GB", price: "₦200000", duration: "365days" },
        { data: "50GB", price: "₦500000", duration: "365days" },
      ],
    },
    {
      timeFrame: "Unlimited",
      plans: [{ data: "Unlimited", price: "₦1000000", duration: "365days" }],
    },
  ];

const mappedPlans = purchaceData.find(plan => plan.timeFrame === selectedDuretion)?.plans || [];

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
              <div className=" w-full flex rounded-2xl p-4 bg-alternate/10 left-0">
                {serviceProviders.map((item, index) => (
                  <div
                    onClick={handleToggleDropdown}
                    key={index}
                    className="w-full  p-3 rounded-2xl flex-col flex items-center gap-2 hover:bg-alternate/50 cursor-pointer"
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
            </div>

            <div className=" w-full flex flex-col gap-3 max-h-130 overflow-y-hidden bg-white p-3 rounded-2xl items-start">
              <h1 className="text-2xl font-medium text-center mx-auto ">
                select plan
              </h1>

              <div className="w-full flex  py-3 items-center gap-3">
                {purchaceData.map((item, index) => (
                  <div key={index} className={` relative w-full border-3 transition-all duration-300 rounded-xl p-1 text-sm  ${
                    selectedDuretion === item.timeFrame
                      ? "bg-primary text-white"
                      : "border-primary/40"
                  }`}>
                    <button onClick={() => setSelectedDuration(item.timeFrame)} className="w-full">{item.timeFrame}</button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-5 w-full">
                {mappedPlans.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full bg-alternate/10 text-center py-1 border-2 border-primary/60 hover:scale-105 transition-all duration-300 shadow-sm rounded-xl font-semibold "
                  >
                    {item.data}
                    <br />
                    <span className="text-primary ">{item.price}</span>
                    <br />
                    <span>{item.duration}</span>
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
