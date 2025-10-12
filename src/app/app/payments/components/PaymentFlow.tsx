import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { useAuth } from "@/hooks/useAuth";
import { formatNGN } from "@/utils/amount";

interface PaymentPageProps {
  type:
    | "airtime"
    | "data"
    | "betting"
    | "tv"
    | "electricity"
    | "billNaTransaction"
    | "bankTransaction";
}
type Provider = {
  service_id: string,
  service_name: string,
  logo: string,
}

export default function PaymentPage({ type }: PaymentPageProps) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [formData, setFormData] = useState({
    service_id: "",
    phone: "",
    amount: "",
    plan: "",
    customer_id: "",
    meter: "",
    planType: "",

    variation_id: "",
  });
  const [providers, setProviders] = useState<Provider[] | null | []>(null);
  const [tvVariations, setTvVariations] = useState<null | []>(null);
  const [dataVariations, setDataVariations] = useState<null | []>(null);
  const [selectedDuration, setSelectedDuration] = useState("Daily");
  const { user } = useAuth();

  const handleBack = () => {
    if (step === 1) window.history.back();
    else setStep((prev) => prev - 1);
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleReset = () => {
    setStep(1);
    setOtp(["", "", "", ""]);
    setSuccess(null);
    setFormData({
      service_id: "",
      phone: "",
      amount: "",
      plan: "",
      customer_id: "",
      meter: "",
      variation_id: "",
    });
  };


  useEffect(() => {
    handleFormChange("phone", user?.phone ?? "")
  }, [user]);

  const typeConfig = {
    airtime: { title: "Buy Airtime" },
    data: { title: "Purchase Data" },
    betting: { title: "Betting Top-Up" },
    tv: { title: "Cable Subscription" },
    electricity: { title: "Electricity Token" },
    billNaTransaction: { title: "In App Transaction" },
    bankTransaction: { title: "Transfer to other bank" },
    tv: { title: "Cable/TV Subscription" },
    electricity: { title: " Electricity Token" },
  };

  useEffect(() => {
    setLoading(true)
    const getProviders = async () => {
      const res = await api.get<ApiResponse>(`/general/bill/${type}-services`)
      if (!res.data.error && res.data.data && res.data.data.length > 0) {
        setProviders(res.data.data)
      } else {
        setProviders([])
      }
      setLoading(false)
    }
    getProviders();
  }, [type])

  const getTVVariations = async (service_id: string) => {
    setLoading(true)
    try {
      const res = await api.get<ApiResponse>(`/general/bill/tv-variations?service=${service_id}`)
      if (!res.data.error && res.data.data && res.data.data.length > 0) {
        setTvVariations(res.data.data)
      } else {
        setTvVariations([])
      }
    } catch (err) {
      setDataVariations([])
    } finally {
      setLoading(false)
    }
  }

  const getDataVariations = async (service_id: string) => {
    setLoading(true)
    try {
      const res = await api.get<ApiResponse>(`/general/bill/data-variations?service=${service_id}`)
      if (!res.data.error && res.data.data && res.data.data.length > 0) {
        setDataVariations(res.data.data)
      } else {
        setDataVariations([])
      }
    } catch (err) {
      setDataVariations([])
    } finally {
      setLoading(false)
    }
  }

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

  const providers: {
    airtime: { value: string; name: string }[];
    data: { value: string; name: string }[];
    betting: { value: string; name: string }[];
    tv: { value: string; name: string }[];
    electricity: { value: string; name: string }[];
    billNaTransaction: { value: string; name: string }[];
    bankTransaction: { value: string; name: string }[];
  } = {
    airtime: [
      { value: "mtn", name: "MTN" },
      { value: "airtel", name: "Airtel" },
      { value: "glo", name: "Glo" },
      { value: "9mobile", name: "9mobile" },
    ],
    data: [
      { value: "mtn", name: "MTN" },
      { value: "airtel", name: "Airtel" },
      { value: "glo", name: "Glo" },
      { value: "9mobile", name: "9mobile" },
    ],
    betting: [
      { value: "bet9ja", name: "Bet9ja" },
      { value: "sportybet", name: "SportyBet" },
      { value: "1xbet", name: "1xBet" },
      { value: "betking", name: "BetKing" },
    ],
    tv: [
      { value: "dstv", name: "DSTV" },
      { value: "gotv", name: "GOTV" },
      { value: "startimes", name: "Startimes" },
    ],
    electricity: [
      { value: "ikedc", name: "IKEDC" },
      { value: "eedc", name: "EEDC" },
      { value: "aedc", name: "AEDC" },
      { value: "kedco", name: "KEDCO" },
    ],
    billNaTransaction: [],
    bankTransaction: [],
  };

  const dataPlans = [
    { value: "500mb", label: "500MB - ₦200", amount: "200" },
    { value: "1gb", label: "1GB - ₦350", amount: "350" },
    { value: "2gb", label: "2GB - ₦700", amount: "700" },
  ];

  const tvPlans = [
    { value: "dstv_padi", label: "DSTV Padi - ₦2,500", amount: "2500" },
    { value: "gotv_max", label: "GOTV Max - ₦4,800", amount: "4800" },
  ];

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (type == "data" && field == "service_id") {
      getDataVariations(value)
    }
  };

  const isStep1Valid = () => {
    const baseCheck = !!formData.service_id;
    switch (type) {
      case "airtime":
        return baseCheck && !!formData.phone && !!formData.amount;
      case "data":
        return baseCheck && !!formData.phone && !!formData.plan;
      case "betting":
        return baseCheck && !!formData.customer_id && !!formData.amount;
      case "tv":
        return baseCheck && !!formData.customer_id && !!formData.plan;
      case "electricity":
        return (
          baseCheck &&
          !!formData.customer_id &&
          !!formData.variation_id &&
          !!formData.amount
        );
      case "billNaTransaction":
        return baseCheck && !!formData.account && !!formData.amount;
      case "bankTransaction":
        return baseCheck && !!formData.account && !!formData.amount;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-stone-900">
                {typeConfig[type].title}
              </h2>
              <p className="text-stone-500 text-sm">
                Complete your transaction securely
              </p>
            </div>

            <div className="space-y-6">
              {loading || !providers ?
                <div className="w-full flex flex-col gap-2">
                  <p className="text-md font-normal text-stone-800">Select Provider</p>
                  <div className="w-full animate-pulse grid grid-cols-4 gap-2">
                    <div className="w-full h-20 rounded-lg border border-stone-200 flex flex-col items-center justify-center gap-2 bg-white shadow-md">
                      <div className="w-12 h-12 rounded-full bg-stone-200 animate-pulse" />
                      <div className="w-[60%] h-2 rounded-xl bg-stone-200 animate-pulse" />
                    </div>
                    <div className="w-full h-20 rounded-lg border border-stone-200 flex flex-col items-center justify-center gap-2 bg-white shadow-md">
                      <div className="w-12 h-12 rounded-full bg-stone-200 animate-pulse" />
                      <div className="w-[60%] h-2 rounded-xl bg-stone-200 animate-pulse" />
                    </div>
                    <div className="w-full h-20 rounded-lg border border-stone-200 flex flex-col items-center justify-center gap-2 bg-white shadow-md">
                      <div className="w-12 h-12 rounded-full bg-stone-200 animate-pulse" />
                      <div className="w-[60%] h-2 rounded-xl bg-stone-200 animate-pulse" />
                    </div>
                    <div className="w-full h-20 rounded-lg border border-stone-200 flex flex-col items-center justify-center gap-2 bg-white shadow-md">
                      <div className="w-12 h-12 rounded-full bg-stone-200 animate-pulse" />
                      <div className="w-[60%] h-2 rounded-xl bg-stone-200 animate-pulse" />
                    </div>
                  </div>
                </div>
                :
                (providers.length === 0 ?
                  <p className="text-center py-4 font-normal text-stone-800">
                    Service not available at the moment
                  </p> :
                  <ProviderSelect
                    label="Select Provider"
                    providers={providers}
                    value={formData.service_id}
                    onChange={(value) => handleFormChange("service_id", value)}
                  />
                )}

              {type === "airtime" && (
                <>
                  <InputField
                    label="Recipient's Phone Number"
                    placeholder="2348012345678"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {type === "data" && (
                <>
                  <PlanSelect
                    label="Select Data Plan"
                    plans={dataPlans}
                    value={formData.plan}
                    onSelect={(plan) => {
                      handleFormChange("plan", plan.label);
                      handleFormChange("amount", plan.amount);
                    }}
                    purchaceData={purchaceData}
                  />
                  <InputField
                    label="Phone Number"
                    placeholder="2348012345678"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                </>
              )}

              {type === "betting" && (
                <>
                  <InputField
                    label="Account ID"
                    placeholder="Enter  Account ID"
                    value={formData.customer_id}
                    onChange={(e) =>
                      handleFormChange("customer_id", e.target.value)
                    }
                    verify
                  />
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {type === "tv" && (
                <>
                  <InputField
                    label="Smart Card Number"
                    placeholder="Enter smart card number"
                    value={formData.customer_id}
                    onChange={(e) =>
                      handleFormChange("customer_id", e.target.value)
                    }
                    verify
                  />
                  <PlanSelect
                    label="Select Plan"
                    plans={tvPlans}
                    value={formData.plan}
                    onSelect={(plan) => {
                      handleFormChange("plan", plan.label);
                      handleFormChange("amount", plan.amount);
                    }}
                  />
                </>
              )}

              {type === "electricity" && (
                <>
                  <InputField
                    label="Meter Number"
                    placeholder="Enter meter number"
                    value={formData.meter}
                    onChange={(e) => handleFormChange("meter", e.target.value)}
                    verify
                  />
                  <SelectField
                    label="Payment Type"
                    options={["Prepaid", "Postpaid"]}
                    value={formData.variation_id}
                    onChange={(e) =>
                      handleFormChange("variation_id", e.target.value)
                    }
                  />
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {type === "bankTransaction" && (
                <>
                  <InputField
                    label="Account Number"
                    placeholder="Enter meter number"
                    value={formData.account}
                    onChange={(e) => handleFormChange("account", e.target.value)}
                    verify
                  />
                 
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {type === "billNaTransaction" && (
                <>
                  <InputField
                    label="BillN Account Number"
                    placeholder="Enter account number"
                    value={formData.account}
                    onChange={(e) => handleFormChange("account", e.target.value)}
                    verify
                  />
                 
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {/* <div className=" w-full bg-white  flex justify-between items-center rounded-2xl px-3 py-5">
                <h1 className=" text-xl font-semibold text-black/70 ">
                  Save as Beneficiary
                </h1>
                <div
                  className={`" w-20 border-2 border-primary rounded-full p-1 items-center flex ${saveBeneficiary ? "justify-end " : "justify-start"
                    } `}
                >
                  <div
                    onClick={handleSaveBeneficiary}
                    className={`" w-8 h-8 rounded-full   ${saveBeneficiary
                        ? "translate-x-0 bg-primary"
                        : "translate-x-[-2px] bg-stone-500"
                      }  transition-all duration-500 cursor-pointer `}
                  ></div>
                </div>
              </div> */}

              <button
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Continue to Review
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
                  <ReviewItem label="Product" value={typeConfig[type].title} />
                  <div className="border-t border-teal-100" />
                  <ReviewItem
                    label="Provider"
                    value={formData.service_id.toUpperCase().replaceAll("-", " ")}
                  />
                  {formData.phone && (
                    <ReviewItem label="Phone" value={formData.phone} />
                  )}
                  {formData.customer_id && (
                    <ReviewItem
                      label={type === "tv" ? "Smart Card" : "Account"}
                      value={formData.customer_id}
                    />
                  )}
                  {formData.meter && (
                    <ReviewItem label="Meter" value={formData.meter} />
                  )}
                  {formData.plan && (
                    <ReviewItem label="Plan" value={formData.plan} />
                  )}
                  {formData.variation_id && (
                    <ReviewItem label="Type" value={formData.variation_id} />
                  )}
                  <div className="border-t border-teal-100" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-600 font-medium">
                      Amount
                    </span>
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
              className="bg-white rounded-3xl px-6 pb-24 pt-8 w-full max-w-md shadow-2xl"
            >

              <button
                onClick={handleBack}
                className="w-full text-left items-start justify-start text-stone-600 font-semibold py-3 hover:text-stone-700"
              >
                ← Back
              </button>
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-stone-900">
                    Enter PIN
                  </h2>
                  <p className="text-stone-500 text-sm">
                    Secure your transaction with your 4-digit PIN
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <motion.input
                      key={idx}
                      type={showOTPFull ? "text" : "password"}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value.slice(-1);
                        setOtp(newOtp);
                        if (e.target.value && idx < 3) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                          document.getElementById(`otp-${idx - 1}`)?.focus();
                        }
                      }}
                      id={`otp-${idx}`}
                      className="w-14 h-14 text-2xl font-bold text-center border-2 border-stone-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                      placeholder="•"
                    />
                  ))}
                </div>

                <button
                  onClick={() => setShowOTPFull(!showOTPFull)}
                  className="flex items-center justify-center gap-2 mx-auto text-sm text-stone-600 hover:text-stone-800"
                >
                  {showOTPFull ? <EyeOff size={18} /> : <Eye size={18} />}
                  {showOTPFull ? "Hide" : "Show"}
                </button>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (otp.every((d) => d)) {
                        setSuccess(Math.random() > 0.4);
                        handleNext();
                      }
                    }}
                    disabled={!otp.every((d) => d)}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed transition-all"
                  >
                    Confirm
                  </button>
                </div>
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
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0"
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl px-6 pb-24 pt-8 w-full max-w-md shadow-2xl text-center space-y-8"
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

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-stone-900">
                  {success ? "Payment Successful!" : "Payment Failed"}
                </h2>
                <p className="text-stone-500">
                  {success
                    ? "Your transaction has been processed successfully. You'll receive a confirmation shortly."
                    : "Something went wrong. Please check your details and try again."}
                </p>
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-stone-600">Reference ID</p>
                  <p className="font-mono font-semibold text-green-700">
                    TRX{Math.random().toString().slice(2, 11)}
                  </p>
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg"
              >
                {success ? "View Transaction" : "Try Again"}
              </button>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-800 to-teal-900 flex flex-col">
      <div className="py-6 px-2 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-white/70 hover:text-white hover:bg-white/10 p-2.5 rounded-full transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">
            {typeConfig[type].title}
          </h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 bg-gradient-to-t from-white to-stone-50 rounded-t-3xl p-6 overflow-y-auto">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-stone-600 text-sm font-medium">{label}</span>
      <span className="text-stone-900 font-semibold capitalize">{value}</span>
    </div>
  );
}

function ProviderSelect({
  label,
  providers,
  value,
  onChange,
}: {
  label: string;
  providers: Provider[];
  value: string;
  onChange: (service_id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-3 relative">
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className=" grid grid-cols-2 [@media(min-width:400px)]:grid-cols-4 gap-2 py-1 mt-2 z-10 overflow-hidden"
      >
        {providers.map((provider) => (
          <button
            key={provider.service_id}
            onClick={() => {
              onChange(provider.service_id);
              setIsOpen(false);
            }}
            className={`${provider.service_id == value ? 'border-2 border-primary bg-teal-50' : 'border border-stone-300 bg-white'} w-full shadow-lg relative rounded-lg flex flex-col items-center gap-1 px-4 py-4 hover:bg-teal-50/75`}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative ">
              <Image src={provider.logo} alt={provider.service_name} fill className="object-cover" />
            </div>
            <span className="font-normal text-sm md:text-md text-stone-800">{provider.service_name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

function PlanSelect({
  label,
  plans,
  value,
  onSelect,
  purchaceData,
}: {
  label: string;
  plans: { value: string; label: string; amount: string }[];
  value: string;
  onSelect: (plan: { label: string; amount: string }) => void;
  purchaceData?: {
    timeFrame: string;
    plans: { data: string; price: string; duration: string }[];
  }[];
}) {
  const [selectedDuration, setSelectedDuration] = useState("Daily");

  const mappedPlans =
    purchaceData?.find((plan) => plan.timeFrame === selectedDuration)?.plans ||
    [];

  return (
    <div className="space-y-3 relative">
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>

      <div className="grid grid-cols-3 [@media(min-width:480px)]:grid-cols-4 [@media(min-width:676px)]:grid-cols-6  gap-2 w-full">
        {mappedPlans.map((item, index) => (
          <button
            key={index}
            type="button"
            className="w-full text-black text-sm  bg-alternate/10 gap-0 flex flex-col items-center justify-center text-center py-2 border-2 border-primary/60 hover:scale-105 transition-all duration-300 shadow-sm rounded-xl font-semibold "
          >
            <span>{item.data}</span>
            <span className="text-primary truncate">{item.price}</span>
            <span className="font-normal text-xs">{item.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AmountGrid({
  value,
  onChange,
  presetAmounts,
}: {
  value: string;
  onChange: (value: string) => void;
  presetAmounts: number[];
}) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-stone-700 block">
        Amount
      </label>
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
        {presetAmounts.map((amt) => (
          <motion.button
            key={amt}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(amt.toString())}
            className={`w-auto mb-2 mr-2 py-3 rounded-full font-semibold transition-all duration-300 border-[1.5px] ${value === amt.toString()
              ? "border-teal-600 bg-gradient-to-r from-teal-100 to-teal-300 text-teal-700 shadow-md"
              : "border-stone-200 text-stone-700 hover:border-stone-300"
              }`}
          >
            ₦{amt.toLocaleString()}
          </motion.button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-150"
      />
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  verify = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  verify?: boolean;
}) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-gray-700 font-semibold text-sm">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-150"
        />
        {verify && (
          <button
            className="px-4 py-3 bg-teal-500 text-white font-semibold text-sm rounded-xl hover:bg-teal-600 transition-colors duration-150 shadow-sm"
            type="button"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border-2 border-stone-200 rounded-lg px-4 py-4 bg-white text-stone-800 font-medium outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "20px",
          paddingRight: "40px",
        }}
      >
        <option value="">Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
