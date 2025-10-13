import React, { useCallback, useState } from "react";
import { AmountGrid, InputField } from "../../payments/components/PaymentFlow";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Keypad } from "@/components/SetPin";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, Eye } from "lucide-react";

type Data = {
  accountNumber: number;
  amount: number;
  bankName: string;
};

export default function BankTransfer() {
  const [formData, setFormData] = useState({
    tag: "",
    amount: "",
  });
  const [step, setStep] = useState(1);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleBack = () => {
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className=" flex flex-col items-center  space-y-4">
            <h1 className="w-full text-teal-600 font-bold">
              Enter user tag for in-app Transfer
            </h1>
            <InputField
              label="Tag:"
              placeholder="@User"
              value={formData.tag}
              onChange={(e) => handleInputChange("tag", e.target.value)}
              verify
            />
            <h1 className="text-sm">
              Don't know the person account number?{" "}
              <span className="text-teal-500 font-semibold">Ask Them</span>
            </h1>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center space-y-4">
            <AmountGrid
              type="transfer"
              value={formData.amount}
              onChange={(value) => handleInputChange("amount", value)}
              presetAmounts={presetAmounts}
            />
          </div>
        );
      case 3:
        return (
          <AnimatePresence>
            <motion.div
              className="container fixed inset-0 flex items-center justify-center z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBack}
            >
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="mt-8  bg-black/40 backdrop-blur-sm  p-10 rounded-2xl"
              >
                <div className="flex justify-center  gap-6 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: otp[i] ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold ${
                        showOTPFull
                          ? "border-2 border-teal-200 bg-teal-50 text-teal-700"
                          : otp[i]
                          ? "bg-teal-600 text-white"
                          : "bg-stone-200 border border-stone-300"
                      }`}
                    >
                      {showOTPFull ? otp[i] || "" : otp[i] ? "•" : ""}
                    </motion.div>
                  ))}
                </div>

                {/* Show/Hide Toggle */}
                <button
                  onClick={() => setShowOTPFull(!showOTPFull)}
                  className="flex items-center justify-center gap-2 mx-auto mb-6 text-sm text-stone-600 hover:text-stone-800"
                >
                  {showOTPFull ? <EyeOff size={18} /> : <Eye size={18} />}
                  {showOTPFull ? "Hide" : "Show"} PIN
                </button>

                <Keypad
                  numbers={[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "←",
                    "0",
                    "✓",
                  ]}
                  onNumberClick={(num) => {
                    if (num === "←") {
                      // Handle delete
                      const lastFilledIndex = otp.reduce(
                        (acc, digit, idx) => (digit ? idx : acc),
                        -1
                      );
                      if (lastFilledIndex >= 0) {
                        const newOtp = [...otp];
                        newOtp[lastFilledIndex] = "";
                        setOtp(newOtp);
                      }
                    } else if (num === "✓") {
                      // Handle confirm
                      if (otp.every((d) => d)) {
                        setSuccess(Math.random() > 0.4);
                        handleNext();
                      }
                    } else {
                      // Handle number input
                      const emptyIndex = otp.findIndex((digit) => !digit);
                      if (emptyIndex !== -1) {
                        const newOtp = [...otp];
                        newOtp[emptyIndex] = num;
                        setOtp(newOtp);
                      }
                    }
                  }}
                  onDelete={() => {
                    const lastFilledIndex = otp.reduce(
                      (acc, digit, idx) => (digit ? idx : acc),
                      -1
                    );
                    if (lastFilledIndex >= 0) {
                      const newOtp = [...otp];
                      newOtp[lastFilledIndex] = "";
                      setOtp(newOtp);
                    }
                  }}
                  onConfirm={() => {
                    if (otp.every((d) => d)) {
                      setSuccess(Math.random() > 0.4);
                      handleNext();
                    }
                  }}
                  disableConfirm={!otp.every((d) => d)}
                  loading={false}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto min-h-full">
      {renderStep()}
      <div className="flex flex-col items-center space-y py-4">
        {step < 3 && (
          <button
            onClick={handleNext}
            className="py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 max-w-50 w-full rounded-2xl"
          >
            Continue
          </button>
        )}

        {step === 1 && (
          <div className="mt-6 w-full">
            <CardHeader className="text-teal-800 text-xl flex justify-between font-semibold">
              <button className="cursor-pointer">Recent</button>
              <button className="cursor-pointer">Favourite</button>
            </CardHeader>
            <Card className="gap-0 py-0 max-h-110 overflow-y-scroll">
              <div className="flex gap-2 py-4 items-center px-5 hover:bg-alternate/10">
                <div className="rounded-full font-bold text-2xl w-14 h-14 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={"/img/user.jpg"}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div>Tali Nanzing</div>
                  <div className="text-stone-500">@tali</div>
                </div>
              </div>
              <div className="flex gap-2 py-4 items-center px-5 hover:bg-alternate/10">
                <div className="rounded-full font-bold text-2xl w-14 h-14 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={"/img/user.jpg"}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div>Tali Nanzing</div>
                  <div className="text-stone-500">@tali</div>
                </div>
              </div>
              <div className="flex gap-2 py-4 items-center px-5 hover:bg-alternate/10">
                <div className="rounded-full font-bold text-2xl w-14 h-14 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={"/img/user.jpg"}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div>Tali Nanzing</div>
                  <div className="text-stone-500">@tali</div>
                </div>
              </div>
              <div className="flex gap-2 py-4 items-center px-5 hover:bg-alternate/10">
                <div className="rounded-full font-bold text-2xl w-14 h-14 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={"/img/user.jpg"}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div>Tali Nanzing</div>
                  <div className="text-stone-500">@tali</div>
                </div>
              </div>
              <div className="flex gap-2 py-4 items-center px-5 hover:bg-alternate/10">
                <div className="rounded-full font-bold text-2xl w-14 h-14 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={"/img/user.jpg"}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div>Tali Nanzing</div>
                  <div className="text-stone-500">@tali</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
