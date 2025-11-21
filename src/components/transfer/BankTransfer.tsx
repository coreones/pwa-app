"use client";

import React, { useEffect, useState } from "react";
import { AmountGrid, InputField, ReviewItem } from "@/components/PaymentFlow";
import { Keypad } from "@/components/SetPin";
import { motion } from "framer-motion";
import {
  Loader2,
  ChevronDown,
} from "lucide-react";
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

      setVerifyData(res.data.data)
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

      const res = await api.post<ApiResponse>("/transfers/bank", {
        account_name: formData.account_name,
        account_number: formData.account_number,
        bank_name: formData.bank_name,
        bank_code: formData.bank_code,
        amount: formData.amount,
        remarks: formData.remarks,
        verify_data: verifyData,
        pin: pinExtractor(otp)
      })

      if (res.data.error) {
        toast.error("Transfer failed")
        return;
      }
      toast.success("Transfer successful!");

      // Reset all
      setFormData({
        account_number: "",
        bank_name: "",
        bank_code: "",
        account_name: "",
        amount: "",
        remarks: "",
      });
      setVerifyData(null)
      setOtp(["", "", "", ""]);
      setStep(1);

    } catch (err) {
      toast.error("Error performing transfer");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = () => {
  };

  const handleConfirm = () => {
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
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4">Review Transaction</h2>

              <div className="space-y-3">
                <ReviewItem label="Bank" value={formData.bank_name} />
                <ReviewItem label="Account Number" value={formData.account_number} />
                <ReviewItem label="Account Name" value={formData.account_name} />
                <ReviewItem label="Amount" value={formatNGN(Number(formData.amount))} />
                {formData.remarks && (
                  <ReviewItem label="Remarks" value={formData.remarks} />
                )}
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full mt-5 bg-teal-600 text-white py-3 rounded-xl"
              >
                Confirm & Send
              </button>
            </motion.div>
          </motion.div>
        );

      /* --------------------------------
            STEP 4 — OTP/PIN
      -------------------------------- */
      case 4:
        return (
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold mb-4">Enter PIN</h2>

            <div className="flex justify-center gap-3 mb-4">
              {otp.map((d, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center bg-stone-200 rounded-xl text-xl"
                >
                  {showOTPFull ? d : d ? "•" : ""}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowOTPFull(!showOTPFull)}
              className="mb-4 text-sm text-stone-500"
            >
              {showOTPFull ? "Hide PIN" : "Show PIN"}
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
                  const lastFilled = otp.findLastIndex((d) => d !== "");
                  if (lastFilled >= 0) {
                    const newOtp = [...otp];
                    newOtp[lastFilled] = "";
                    setOtp(newOtp);
                  }
                  return;
                }

                if (num === "✓") {
                  if (otp.every((d) => d)) handleSend();
                  return;
                }

                const empty = otp.findIndex((d) => d === "");
                if (empty !== -1) {
                  const newOtp = [...otp];
                  newOtp[empty] = num;
                  setOtp(newOtp);
                }
              }}
              onDelete={handleDelete}
              onConfirm={handleConfirm}
              disableConfirm={!otp.every((d) => d)}
              loading={sending}
            />
          </div>
        );
    }
  };

  /* --------------------------------
      Return Main
  -------------------------------- */
  return (
    <div className="w-full max-w-lg mx-auto">
      {renderStep()}
    </div>
  );
}
