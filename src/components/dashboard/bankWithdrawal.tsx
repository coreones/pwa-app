"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { Keypad } from "@/components/SetPin";
import { formatNGN } from "@/utils/amount";
import { pinExtractor } from "@/utils/string";

interface BankWithdrawalProps {
  balance: number;
}

type BankDetails = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: string;
};

export default function BankWithdrawal({ balance }: BankWithdrawalProps) {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPinFull, setShowPinFull] = useState(false);
  const [reference, setReference] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    accountNumber: "",
    accountName: "",
    amount: "",
  });

  const handleBack = () => {
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const handleReset = () => {
    setStep(1);
    setPin(["", "", "", ""]);
    setSuccess(null);
    setBankDetails({
      bankName: "",
      accountNumber: "",
      accountName: "",
      amount: "",
    });
  };

  const handleBankDetailsChange = (field: keyof BankDetails, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleWithdrawal = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const withdrawalAmount = parseFloat(bankDetails.amount);
        if (withdrawalAmount > balance) {
          setSuccess(false);
          toast.error("Insufficient balance");
        } else {
          setSuccess(true);
          setReference(`WD${Date.now()}`);
          toast.success(`${bankDetails.amount} sent successfully to ${bankDetails.accountName}`);
        }
        setLoading(false);
        handleNext();
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error("Withdrawal failed");
      handleNext();
    }
  };

  const isStep1Valid = () => {
    const amount = parseFloat(bankDetails.amount);
    return (
      bankDetails.bankName.trim() !== "" &&
      bankDetails.accountNumber.trim() !== "" &&
      bankDetails.accountName.trim() !== "" &&
      !isNaN(amount) &&
      amount > 0 &&
      amount <= balance
    );
  };

  const presetAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Balance Display */}
            <div className="bg-gradient-to-r from-[#21A29D] to-[#1b8a88] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Available Balance</p>
                  <p className="text-2xl font-bold mt-1">
                    ₦{balance.toLocaleString()}
                  </p>
                </div>
                <Landmark className="w-8 h-8 opacity-90" />
              </div>
            </div>

            {/* Withdrawal Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₦)
                </label>
                
                {/* Preset Amounts */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleBankDetailsChange("amount", amount.toString())}
                      className={`py-2 rounded-lg font-medium text-sm border transition-all ${
                        bankDetails.amount === amount.toString()
                          ? "bg-[#21A29D] text-white border-[#21A29D]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#21A29D]"
                      }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <input
                  type="number"
                  value={bankDetails.amount}
                  onChange={(e) => handleBankDetailsChange("amount", e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => handleBankDetailsChange("bankName", e.target.value)}
                  placeholder="Enter bank name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
                  placeholder="Enter account number"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountName}
                  onChange={(e) => handleBankDetailsChange("accountName", e.target.value)}
                  placeholder="Enter account name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#21A29D] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className="w-full bg-gradient-to-r from-[#21A29D] to-[#1b8a88] text-white font-semibold py-4 rounded-xl hover:from-[#1b8a88] hover:to-[#167875] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl duration-300 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-3xl px-6 pb-20 pt-10 sm:pb-10 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-900">
                  Review Withdrawal
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
                  <ReviewItem label="Transaction Type" value="Bank Withdrawal" />
                  <div className="border-t border-teal-100" />
                  <ReviewItem label="Bank" value={bankDetails.bankName} />
                  <ReviewItem label="Account Number" value={bankDetails.accountNumber} />
                  <ReviewItem label="Account Name" value={bankDetails.accountName} />
                  <div className="border-t border-teal-100" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-600 font-medium">Amount</span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatNGN(bankDetails.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-[#21A29D] to-[#1b8a88] text-white font-semibold py-4 rounded-xl hover:from-[#1b8a88] hover:to-[#167875] transition-all shadow-lg mb-3"
              >
                Confirm & Withdraw
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

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="relative bg-white rounded-3xl w-full px-6 pb-20 max-w-md sm:pb-6 sm:px-8 shadow-2xl border border-stone-100"
            >
              {/* Close Button */}
              <div className="w-full pb-8">
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4 text-stone-500 hover:text-stone-700 transition-colors"
                  title="Close"
                >
                  <motion.span whileHover={{ scale: 1.1 }} className="text-4xl">
                    ✕
                  </motion.span>
                </button>
              </div>

              {/* Header */}
              <div className="text-center space-y-2 mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Enter Your PIN
                </h2>
                <p className="text-stone-500 text-sm">
                  To complete this withdrawal, please enter your 4-digit PIN
                </p>
              </div>

              {/* PIN Keypad Component */}
              <div className="mt-8">
                <div className="flex justify-center gap-6 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: pin[i] ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold ${
                        showPinFull
                          ? "border-2 border-[#21A29D] bg-teal-50 text-teal-700"
                          : pin[i]
                          ? "bg-[#21A29D] text-white"
                          : "bg-stone-200 border border-stone-300"
                      }`}
                    >
                      {showPinFull ? pin[i] || "" : pin[i] ? "•" : ""}
                    </motion.div>
                  ))}
                </div>

                {/* Show/Hide Toggle */}
                <button
                  onClick={() => setShowPinFull(!showPinFull)}
                  className="flex items-center justify-center gap-2 mx-auto mb-6 text-sm text-stone-600 hover:text-stone-800"
                >
                  {showPinFull ? <EyeOff size={18} /> : <Eye size={18} />}
                  {showPinFull ? "Hide" : "Show"} PIN
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
                      const lastFilledIndex = pin.reduce(
                        (acc, digit, idx) => (digit ? idx : acc),
                        -1
                      );
                      if (lastFilledIndex >= 0) {
                        const newPin = [...pin];
                        newPin[lastFilledIndex] = "";
                        setPin(newPin);
                      }
                    } else if (num === "✓") {
                      // Handle confirm
                      if (pin.every((d) => d)) {
                        handleWithdrawal();
                      }
                    } else {
                      // Handle number input
                      const emptyIndex = pin.findIndex((digit) => !digit);
                      if (emptyIndex !== -1) {
                        const newPin = [...pin];
                        newPin[emptyIndex] = num;
                        setPin(newPin);
                      }
                    }
                  }}
                  onDelete={() => {
                    const lastFilledIndex = pin.reduce(
                      (acc, digit, idx) => (digit ? idx : acc),
                      -1
                    );
                    if (lastFilledIndex >= 0) {
                      const newPin = [...pin];
                      newPin[lastFilledIndex] = "";
                      setPin(newPin);
                    }
                  }}
                  onConfirm={() => {
                    if (pin.every((d) => d)) {
                      handleWithdrawal();
                    } else {
                      toast.error("Please enter your 4-digit PIN");
                    }
                  }}
                  disableConfirm={!pin.every((d) => d)}
                  loading={loading}
                />
              </div>
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl px-6 pb-20 pt-10 sm:pb-10 w-full max-w-md shadow-2xl text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                {success ? (
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-12 h-12 text-white" />
                  </div>
                )}
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-stone-900">
                  {success ? "Withdrawal Successful" : "Withdrawal Failed"}
                </h2>
                <p className="text-stone-500">
                  {success
                    ? `₦${parseFloat(bankDetails.amount).toLocaleString()} has been sent to ${bankDetails.accountName}. You'll receive a confirmation shortly.`
                    : "Something went wrong. Please check your details and try again."}
                </p>
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-stone-600">Reference ID</p>
                  <p className="font-mono font-semibold text-green-700">
                    {reference}
                  </p>
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-[#21A29D] to-[#1b8a88] text-white font-semibold py-4 rounded-xl hover:from-[#1b8a88] hover:to-[#167875] transition-all shadow-lg"
              >
                {success ? "Close" : "Try Again"}
              </button>
              {!success && (
                <button
                  onClick={() => {
                    setPin(["", "", "", ""]);
                    handleBack();
                  }}
                  className="w-full border border-stone-200 text-stone-700 font-semibold py-4 rounded-xl hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
              )}
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-stone-600 text-sm font-medium">{label}</span>
      <span className="text-stone-900 font-semibold">{value}</span>
    </div>
  );
}