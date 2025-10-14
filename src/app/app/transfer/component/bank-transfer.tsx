import React, { useCallback, useEffect, useState } from "react";
import { AmountGrid, InputField, ReviewItem } from "@/components/PaymentFlow";
import Image from "next/image";
import { Keypad } from "@/components/SetPin";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, Eye, X, ChevronLeft } from "lucide-react";
import { formatNGN } from "@/utils/amount";

export default function BankTransfer() {
  const [formData, setFormData] = useState({
    tag: "",
    amount: "",
    remark: "",
  });
  const [step, setStep] = useState(1);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>("");
  const [tag, setTag] = useState("");

  const handleBack = () => {
    setTag("");
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const tags = ["@tali", "@ljtwp", "@barnny"];

  const verify = () => {
    const tag = formData.tag;
    let found = false;

    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === tag) {
        setTag(tags[i]);
        found = true;
        setError(null);
        setTimeout(() => {
          handleNext();
        }, 1000);
        break;
      }
    }

    if (!found) {
      setError("no match found");
      setTag("");
    }
  };

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
          <div className=" flex flex-col items-center  justify-center space-y-4">
            <h1 className="w-full text-teal-600 font-bold">
              Enter user tag for in-app Transfer
            </h1>
            <InputField
              label="Tag:"
              placeholder="@User"
              value={formData.tag}
              onChange={(e) => handleInputChange("tag", e.target.value)}
            />
            {tag && <p className="text-teal-500"> found: {tag}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={verify}
              className="bg-gradient-to-r from-teal-500 font-black text-white to-teal-600 py-3 rounded-2xl w-full max-w-xs"
            >
              Verify
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center min-h-70 w-full space-y-4">
            <div className=" space-y-6 bg-alternate/10 p-4 rounded-2xl w-full">
              <div className="flex gap-2 py-4 items-center px-5 rounded-2xl bg-alternate/10">
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
                  <div className="text-stone-500">{tag}</div>
                </div>
              </div>
              <AmountGrid
                type="transfer"
                value={formData.amount}
                onChange={(value) => handleInputChange("amount", value)}
                presetAmounts={presetAmounts}
              />
              <InputField
                label="Remark"
                placeholder="School fee"
                onChange={(e) => handleInputChange("remark", e.target.value)}
                value={formData.remark}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-3xl px-6 pb-16 pt-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-900">
                  Review Transaction
                </h2>
                <button
                  onClick={handleBack}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-2xl p-6 border border-teal-100 space-y-4">
                  <ReviewItem label="Tansfer" value={`Send`} />
                  <div className="border-t border-teal-100" />
                  <ReviewItem
                    label="Amount"
                    value={formData.amount.toUpperCase().replaceAll("-", " ")}
                  />
                  {formData.tag && (
                    <ReviewItem label="Tag" value={formData.tag} />
                  )}
                  {formData.remark && (
                    <ReviewItem label={"Remark"} value={formData.remark} />
                  )}

                  <div className="border-t border-teal-100" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-600 font-medium">Amount</span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatNGN(formData.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg mb-3"
              >
                Confirm & Pay
              </button>
              <button
                onClick={handleBack}
                className="w-full border border-stone-200 text-stone-700 font-semibold py-4 rounded-xl hover:bg-stone-50 transition-all"
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        );

      case 4:
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
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold ${showOTPFull
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
    <div className="w-full max-w-2xl mx-auto min-h-full space-y-4">
      <button
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-alternate/10 hover:text-red-500 transition-all duration-300"
      >
        <ChevronLeft size={14} />
      </button>
      {renderStep()}
      <div className="flex flex-col items-center space-y py-4">
        {step > 1 && (
          <div className="w-full flex items-center justify-between">
            {step < 3 && (
              <button
                onClick={handleBack}
                className="py-2 bg-gradient-to-r from-stone-200 to-stone-100 text-white px-3 max-w-50 w-full rounded-2xl"
              >
                Cancel
              </button>
            )}

            <button
              onClick={handleNext}
              className="py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 max-w-50 w-full rounded-2xl"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
