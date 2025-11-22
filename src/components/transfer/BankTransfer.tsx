"use client";

import React, { useEffect, useState } from "react";
import { AmountGrid, InputField, ReviewItem } from "@/components/PaymentFlow";
import { Keypad } from "@/components/SetPin";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ChevronDown, Eye, EyeOff, X } from "lucide-react";
import { formatNGN } from "@/utils/amount";
import { ApiResponse } from "@/types/api";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { pinExtractor } from "@/utils/string";

interface Bank {
  name: string;
  code: string;
  logo?: string | null;
}

interface VerifyData {
  account_name: string;
  account_number: string;
  bank_code: string;
  bank_name?: string | null;
  session_id?: string | null;
}

export default function BankTransfer({ balance }: { balance: number }) {
  const [formData, setFormData] = useState({
    account_number: "",
    bank_name: "",
    bank_code: "",
    account_name: "",
    remarks: "",
    amount: "",
  });

  const [verifyData, setVerifyData] = useState<VerifyData | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [search, setSearch] = useState("");
  const [toggleBanks, setToggleBanks] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [sending, setSending] = useState(false);

  const handleBack = () => {
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  /* --------------------------------
      Fetch Banks Once
  -------------------------------- */
  useEffect(() => {
    const loadBanks = async () => {
      const res = await api.get<ApiResponse>("/general/banks");
      if (!res.data.error) {
        setBanks(res.data.data);
        setFilteredBanks(res.data.data);
      }
    };
    loadBanks();
  }, []);

  /* --------------------------------
      Filter Bank Search
  -------------------------------- */
  useEffect(() => {
    if (!banks) return;
    const f = banks.filter(
      (b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.code.includes(search)
    );
    setFilteredBanks(f);
  }, [search, banks]);

  /* --------------------------------
      Auto Verify Bank When Both Fields Are Ready
  -------------------------------- */
  useEffect(() => {
    if (
      formData.account_number.length >= 10 &&
      formData.bank_code.trim() !== ""
    ) {
      verifyBank();
    }
  }, [formData.account_number, formData.bank_code]);

  /* --------------------------------
      Update FormData Helper
  -------------------------------- */
  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /* --------------------------------
      Bank Verification
  -------------------------------- */
  const verifyBank = async () => {
    setVerifyLoading(true);
    try {
      const res = await api.post<ApiResponse>("/general/name-enquiry", {
        account_number: formData.account_number,
        bank_code: formData.bank_code,
      });

      if (res.data.error) {
        toast.error("Invalid account details");
        updateForm("account_name", "");
        return;
      }

      setVerifyData(res.data.data);
      updateForm("account_name", res.data.data.account_name);
    } catch (err) {
      toast.error("Failed to verify account details");
    } finally {
      setVerifyLoading(false);
    }
  };

  /* --------------------------------
      Select Bank
  -------------------------------- */
  const handleSelectedBank = (bank: Bank) => {
    updateForm("bank_name", bank.name);
    updateForm("bank_code", bank.code);
    setToggleBanks(false);
  };

  /* --------------------------------
      Handle Sending (Mock)
  -------------------------------- */
  const handleSend = async () => {
    try {
      setSending(true);

      const res = await api.post<ApiResponse>("/transfer/bank", {
        account_name: formData.account_name,
        account_number: formData.account_number,
        bank_name: formData.bank_name,
        bank_code: formData.bank_code,
        amount: formData.amount,
        remarks: formData.remarks,
        verify_data: verifyData,
        pin: pinExtractor(otp),
      });

      if (res.data.error) {
        toast.error(res.data.message || "Transfer failed");
        return;
      }
      toast.success(res.data.message || "Transfer successful!");

      // Reset all
      setFormData({
        account_number: "",
        bank_name: "",
        bank_code: "",
        account_name: "",
        amount: "",
        remarks: "",
      });
      setVerifyData(null);
      setOtp(["", "", "", ""]);
      setStep(1);
    } catch (err) {
      toast.error("Unable to complete transfer, please try again..");
    } finally {
      setSending(false);
    }
  };

  /* --------------------------------
      Render Steps
  -------------------------------- */
  const renderStep = () => {
    switch (step) {
      /* --------------------------------
            STEP 1 — Account Number + Bank
      -------------------------------- */
      case 1:
        return (
          <div className="space-y-4">
            <InputField
              label="Account Number"
              placeholder="0123456789"
              value={formData.account_number}
              onChange={(e) => updateForm("account_number", e.target.value)}
            />

            <div className="relative">
              <div className="font-semibold text-gray-700 mb-1">Bank</div>

              <button
                onClick={() => setToggleBanks(!toggleBanks)}
                className="flex w-full h-auto items-center bg-card rounded-xl border border-stone-200 px-4 py-3"
              >
                <span className="flex-1 text-left">
                  {formData.bank_name || "Select Bank"}
                </span>
                <ChevronDown size={20} className="text-stone-400" />
              </button>

              {toggleBanks && (
                <div className="absolute bg-white rounded-xl shadow-xl border mt-2 w-full z-10 p-4 space-y-1">
                  <input
                    placeholder="Search bank"
                    className="w-full border p-3 rounded-xl"
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <div className="max-h-48 overflow-auto space-y-1 flex flex-col">
                    {filteredBanks.map((bank, id) => (
                      <button
                        key={id}
                        onClick={() => handleSelectedBank(bank)}
                        className="px-3 py-2 hover:bg-stone-100 rounded-xl text-left"
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {formData.account_name && (
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl">
                <span className="text-teal-600">Account Name:</span>
                <div className="font-semibold text-teal-800 flex items-center gap-2">
                  {formData.account_name}
                  {verifyLoading && (
                    <Loader2 size={15} className="animate-spin" />
                  )}
                </div>
              </div>
            )}

            {formData.account_name && (
              <button
                onClick={() => setStep(2)}
                className="w-full bg-teal-600 text-white py-3 rounded-xl"
              >
                Next
              </button>
            )}
          </div>
        );

      /* --------------------------------
            STEP 2 — Amount + Remarks
      -------------------------------- */
      case 2:
        return (
          <div className="space-y-4">
            <AmountGrid
              type="transfer"
              value={Number(formData.amount)}
              onChange={(v) => updateForm("amount", v)}
              presetAmounts={[500, 1000, 2000, 5000, 10000]}
            />

            <InputField
              label="Remarks"
              placeholder="Optional note"
              onChange={(e) => updateForm("remarks", e.target.value)}
              value={formData.remarks}
            />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-teal-600 text-white py-3 rounded-xl"
            >
              Continue
            </button>
          </div>
        );

      /* --------------------------------
            STEP 3 — Review
      -------------------------------- */
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
                  <ReviewItem label="Bank" value={formData.bank_name} />
                  <ReviewItem
                    label="Account Number"
                    value={formData.account_number}
                  />
                  <ReviewItem
                    label="Account Name"
                    value={formData.account_name}
                  />
                  <ReviewItem
                    label="Amount"
                    value={formatNGN(Number(formData.amount))}
                  />
                  {formData.remarks && (
                    <ReviewItem label="Remarks" value={formData.remarks} />
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
                onClick={() => setStep(4)}
                className="w-full mt-5 bg-teal-600 text-white py-3 rounded-xl"
              >
                Confirm & Send
              </button>

              <button
                onClick={handleBack}
                className="w-full border mt-2 border-stone-200 text-stone-700 font-semibold py-4 rounded-xl hover:bg-stone-50 transition-all"
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        );

      /* --------------------------------
            STEP 4 — OTP/PIN
      -------------------------------- */
      case 4:
        return (
          <AnimatePresence>
            <motion.div
              className="container fixed inset-0 flex flex-col items-center min-h-screen h-full justify-center z-[99] pb-"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBack}
            >
              <div className="w-full h-full bg-black/25 backdrop-blur-sm"></div>
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-10 rounded-2xl pb-16"
              >
                <div className="flex justify-center gap-6 mb-6">
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
                        handleSend();
                        // handleNext();
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
                  onConfirm={handleSend}
                  disableConfirm={!otp.every((d) => d)}
                  loading={sending}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  /* --------------------------------
      Return Main
  -------------------------------- */
  return <div className="w-full max-w-lg mx-auto">{renderStep()}</div>;
}
