import React, { useCallback, useEffect, useState } from "react";
import { AmountGrid, InputField, ReviewItem } from "@/components/PaymentFlow";
import Image from "next/image";
import { Keypad } from "@/components/SetPin";
import { AnimatePresence, motion } from "framer-motion";
import {
  EyeOff,
  Eye,
  X,
  ChevronLeft,
  ArrowRight,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { formatNGN } from "@/utils/amount";
import { ApiResponse } from "@/types/api";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { pinExtractor } from "@/utils/string";

interface VerifyData {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

interface FormData {
  nickname: string;
  email: string;
  phone: string;
  bankAccount: string;
  bankName: string;
  accountName: string;
  amount: string;
  description: string;
  bankCode: string;
}

interface Banks {
  name: string;
  code: string;
}

// Mock bank data
const MOCK_BANKS: Banks[] = [
  { name: "Bank of America", code: "BOFAUS3N" },
  { name: "JPMorgan Chase", code: "CHASUS33" },
  { name: "Wells Fargo", code: "WFBIUS6S" },
  { name: "Citibank", code: "CITIUS33" },
  { name: "Goldman Sachs", code: "GOLDUS33" },
  { name: "Morgan Stanley", code: "MRMSUS33" },
  { name: "HSBC Bank USA", code: "MRMDUS33" },
  { name: "TD Bank", code: "NRTHUS33" },
  { name: "Capital One", code: "PNBPUS33" },
  { name: "PNC Bank", code: "PNCCUS33" },
  { name: "U.S. Bank", code: "USBKUS44" },
  { name: "Bank of New York", code: "IRVTUS3N" },
  { name: "State Street Bank", code: "SBOSUS33" },
  { name: "Barclays Bank", code: "BARCUS33" },
  { name: "Deutsche Bank", code: "DEUTUS33" },
  { name: "Credit Suisse", code: "CRESUS33" },
  { name: "BNP Paribas", code: "BNPAUS33" },
  { name: "Santander Bank", code: "BSCHUS33" },
  { name: "MUFG Bank", code: "BOTKUS33" },
  { name: "Scotiabank", code: "NOSCUS33" },
];

// Mock account verification data
const MOCK_ACCOUNTS: { [key: string]: { account_name: string } } = {
  "1234567890": { account_name: "John Smith" },
  "0987654321": { account_name: "Sarah Johnson" },
  "1122334455": { account_name: "Michael Brown" },
  "5566778899": { account_name: "Emily Davis" },
  "6677889900": { account_name: "David Wilson" },
  "0912345667": { account_name: "Tali Nanzing" },
  "9123456789": { account_name: "Tali Nanzing" },
};

export default function BankTransfer({ balance }: { balance: number }) {
  const [account_name, setAccountName] = useState<string>("");
  const [account_number, setAccountNumber] = useState<string>("");
  const [bank_code, setBankCode] = useState<string>("");
  const [bank_name, setBankName] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [verifyData, setVerifyData] = useState<VerifyData | null>(null);
  const [bank, setBank] = useState<Banks[]>(MOCK_BANKS);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleBanks, setToggleBanks] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nickname: "",
    email: "",
    phone: "",
    bankAccount: "",
    bankName: "",
    accountName: "",
    bankCode: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    if (
      formData.bankName &&
      formData.bankName.trim() !== "" &&
      formData.bankAccount &&
      formData.bankAccount.length >= 10
    ) {
      verifyBanks();
    }
  }, [formData.bankName, formData.bankAccount]);

  const handleBack = () => {
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const handleVerify = async () => {
    try {
      setVerifying(true);

      // Mock verification - simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResponse: ApiResponse = {
        data: {
          account_number: account_number,
          account_name:
            MOCK_ACCOUNTS[account_number]?.account_name || "Verified Account",
          bank_code: bank_code,
          bank_name: bank_name,
        },
        error: false,
        message: "Account verified successfully",
      };

      if (mockResponse.error) {
        toast.error(mockResponse.message ?? "Invalid Account");
        return;
      }
      setVerifyData(mockResponse.data);
      handleNext();
    } catch (err) {
      console.log(err);
      toast.error(
        "An error occurred while verifying account, please try again!"
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleSend = async () => {
    try {
      setSending(true);

      // Mock transfer - simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockResponse: ApiResponse = {
        data: {
          message: "Transfer completed successfully",
          transaction_id: `TRX${Date.now()}`,
          amount: amount,
          recipient: account_name,
        },
        error: false,
        message: "Transfer successful",
      };

      if (mockResponse.error) {
        toast.error(mockResponse.message ?? "Failed to send to bank");
        return;
      }
      toast.success(mockResponse.data?.message ?? "Transfer successful");

      // Reset form
      setAccountName("");
      setAccountNumber("");
      setBankCode("");
      setBankName("");
      setRemarks("");
      setAmount(0);
      setVerifyData(null);
      setOtp(["", "", "", ""]);
      setShowOTPFull(false);
      setStep(1);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while sending to bank, please try again!");
    } finally {
      setSending(false);
    }
  };

  const filteredBanks = bank.filter(
    (bankItem) =>
      bankItem.name.toLowerCase().includes(search.toLowerCase()) ||
      bankItem.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectedBank = (name: string, code: string) => {
    setFormData((prev) => ({
      ...prev,
      bankName: name,
      bankCode: code,
    }));
    setBankName(name);
    setBankCode(code);
    setToggleBanks(false);
  };

  const verifyBanks = async () => {
    setVerifyLoading(true);
    try {
      // Mock verification - simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const accountName =
        MOCK_ACCOUNTS[formData.bankAccount]?.account_name || "Verified User";

      setFormData((prev) => ({
        ...prev,
        accountName: accountName,
      }));
      setAccountName(accountName);
    } catch (err) {
      console.log("Failed to verify account", err);
      toast.error("Failed to verify account details");
    } finally {
      setVerifyLoading(false);
    }
  };

  const presetAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="w-full text-teal-600 font-bold">
              Enter user account number to transfer
            </h1>
            <div className="w-full flex gap-4 items-center">
              <div className="space-y-4 mt-4 relative w-full">
                {/* Account Number Input */}
                <InputField
                  label="Account number:"
                  placeholder="0912345667"
                  value={account_number}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <div className="flex gap-4">
                  {/* Bank Selection */}

                  <div className="flex-1 w-full relative ">
                    <div className="text-sm font-black text-stone-500">Bank</div>
                    <button
                      onClick={() => setToggleBanks(!toggleBanks)}
                      className="flex w-full h-auto items-center bg-card rounded-full pr-5 border border-stone-200"
                    >
                      <div className="flex-1 py-4 px-4 text-left">
                        <div className="text-stone-800">
                          {formData.bankName || "Select Bank"}
                        </div>
                      </div>
                      <ChevronDown size="24" className="text-stone-400" />
                    </button>

                    {toggleBanks && (
                      <div className="w-full max-h-80 overflow-hidden space-y-5 bg-white border border-stone-200 rounded-2xl absolute z-10 p-5 shadow-lg mt-2">
                        <input
                          placeholder="Search bank"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="py-3 px-4 outline-none bg-background w-full rounded-xl border border-stone-200"
                        />
                        <div className="overflow-auto w-full max-h-52 flex flex-col">
                          {filteredBanks.map((bankItem) => (
                            <button
                              onClick={() =>
                                handleSelectedBank(bankItem.name, bankItem.code)
                              }
                              key={bankItem.code}
                              className="px-4 py-3 hover:bg-stone-100 rounded-xl text-start transition-colors"
                            >
                              {bankItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={handleVerify}
                    disabled={
                      verifying || !formData.bankName || !account_number
                    }
                    className="flex  mt-6 bg-gradient-to-r from-teal-500 font-black text-white to-teal-600 py-3 rounded-2xl w-auto px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifying ? (
                      <Loader2 size={28} className="animate-spin mx-auto" />
                    ) : (
                      <ArrowRight size={28} className="mx-auto" />
                    )}
                  </button>
                </div>

                {formData.accountName && (
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
                    <div className="text-sm text-teal-600">Account Name:</div>
                    <div className="font-semibold text-teal-800">
                      {formData.accountName}
                      {verifyLoading && (
                        <Loader2
                          size={16}
                          className="animate-spin inline ml-2"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center min-h-70 w-full space-y-4">
            <div className="space-y-6 bg-alternate/10 p-4 rounded-2xl w-full">
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
                  <div className="font-semibold">{account_name}</div>
                  <div className="text-stone-500">{account_number}</div>
                  <div className="text-sm text-teal-600">{bank_name}</div>
                </div>
              </div>
              <AmountGrid
                type="transfer"
                value={amount}
                onChange={(value) => setAmount(Number(value))}
                presetAmounts={presetAmounts}
              />
              <InputField
                label="Remark"
                placeholder="School fee"
                onChange={(e) => setRemarks(e.target.value)}
                value={remarks}
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
                  <ReviewItem label="Transfer" value={`Bank`} />
                  <div className="border-t border-teal-100" />
                  <ReviewItem label="Amount" value={formatNGN(amount)} />
                  {bank_name && <ReviewItem label="Bank" value={bank_name} />}
                  {account_number && (
                    <ReviewItem label="Account Number" value={account_number} />
                  )}
                  {account_name && (
                    <ReviewItem label="Account Name" value={account_name} />
                  )}
                  {remarks && <ReviewItem label={"Remark"} value={remarks} />}

                  <div className="border-t border-teal-100" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-600 font-medium">Amount</span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatNGN(amount)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg mb-3"
              >
                Confirm & Send
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
              className="container fixed inset-0 flex flex-col items-center min-h-screen h-full justify-center z-[99]"
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
                      if (otp.every((d) => d)) {
                        handleSend();
                      }
                    } else {
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

  return (
    <div className="w-full max-w-lg mx-auto">
      {renderStep()}
      <div className="flex flex-col items-center space-y py-4">
        {step > 1 && (
          <div className="w-full flex items-center gap-2 justify-end">
            {step < 3 && (
              <button
                onClick={handleBack}
                className="py-3 bg-gradient-to-r from-stone-600 to-stone-400 text-white w-auto px-4 rounded-lg"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={Number(amount) > balance || !account_name}
              className={`${
                Number(amount) > balance || !account_name
                  ? "bg-stone-300 text-stone-800 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-600 to-teal-600 text-white"
              } py-3 w-auto px-4 rounded-lg`}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
