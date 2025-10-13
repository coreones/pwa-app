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
import { stringArray } from "@/utils/string";

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

type Variation = {
  variation_id: string;
  service_name: string;
  service_id: string;
  price: string;
} & (
    | { data_plan: string; package_bouquet?: never }
    | { package_bouquet: string; data_plan?: never }
  );

type Purchase = {
  service_id: string,
  phone: string | number,
  amount: string | number,
  account: string | number,
  customer_id: string | number,
  variation: null | Variation,
  type: string,
}
export default function PaymentPage({ type }: PaymentPageProps) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTPFull, setShowOTPFull] = useState(false);
  const [formData, setFormData] = useState<Purchase>({
    service_id: "",
    phone: "",
    account: "",
    amount: "",
    customer_id: "",
    variation: null,
    type: "",
  });
  const [providers, setProviders] = useState<Provider[] | null | []>(null);
  const [tvVariations, setTvVariations] = useState<Variation[] | null | []>(null);
  const [dataVariations, setDataVariations] = useState<Variation[] | null | []>(null);
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
      account: "",
      amount: "",
      customer_id: "",
      variation: null,
      type: ""
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

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleFormChange = (
    field: string,
    value: string | number | null | Variation
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "service_id" && typeof value === "string") {
      switch (type) {
        case "tv":
          setTvVariations(null);
          getTVVariations(value);
          break;

        case "data":
          setDataVariations(null);
          getDataVariations(value);
          break;
      }
    }
  };



  const isStep1Valid = () => {
    const baseCheck = !!formData.service_id;
    switch (type) {
      case "airtime":
        return baseCheck && !!formData.phone && !!formData.amount;
      case "data":
        return baseCheck && !!formData.phone && !!formData.variation;
      case "betting":
        return baseCheck && !!formData.customer_id && !!formData.amount;
      case "tv":
        return baseCheck && !!formData.customer_id && !!formData.variation && !!formData.type;
      case "electricity":
        return (
          baseCheck &&
          !!formData.customer_id &&
          !!formData.variation &&
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
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-stone-800">
                {typeConfig[type].title}
              </h2>
              <p className="text-stone-500 text-sm">
                Complete your transaction securely
              </p>
            </div>

            <div className="space-y-6">
              {!providers ?
                <ProviderSkeleton />
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
                    type={type}
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

              {type === "data" && (
                <> {loading && <PlanSkeleton />}
                  {dataVariations?.length === 0 ?
                    <p className="text-center py-4 font-normal text-stone-800">
                      No Plan available at the moment
                    </p> :
                    <PlanSelect
                      label="Select Data Plan"
                      value={formData.variation}
                      onSelect={(plan) => {
                        handleFormChange("variation", plan);
                        handleFormChange("amount", plan.price);
                      }}
                      variations={dataVariations}
                      type={type}
                    />
                  }
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
                    placeholder="Enter Smart card number"
                    value={formData.customer_id}
                    onChange={(e) =>
                      handleFormChange("customer_id", e.target.value)
                    }
                    verify
                  />
                  <PlanSelect
                    label="Select Package"
                    value={formData.variation}
                    variations={tvVariations}
                    onSelect={(plan) => {
                      handleFormChange("variation", plan);
                      handleFormChange("amount", plan.price);
                    }}
                    type={type}
                  />
                </>
              )}

              {type === "electricity" && (
                <>
                  <InputField
                    label="Meter Number"
                    placeholder="Enter meter number"
                    value={formData.customer_id}
                    onChange={(e) => handleFormChange("customer_id", e.target.value)}
                    verify
                  />
                  <SelectField
                    label="Type"
                    options={["prepaid", "postpaid"]}
                    value={formData.type}
                    onChange={(value) => handleFormChange("type", value)}
                  />
                  <AmountGrid
                    value={formData.amount}
                    onChange={(value) => handleFormChange("amount", value)}
                    presetAmounts={presetAmounts}
                  />
                </>
              )}

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
                  <ReviewItem label="Product" value={`${type.toUpperCase()}`} />
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
                      label={type === "tv" ? "Smartcardd Number" : "Account ID"}
                      value={formData.customer_id}
                    />
                  )}
                  {formData.customer_id && (
                    <ReviewItem label="Meter Number" value={formData.customer_id} />
                  )}
                  {formData.variation && (
                    <ReviewItem label="Plan" value={type == "tv" ? formData.variation.package_bouquet ?? "" : formData.variation.data_plan ?? ""} />
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

function ReviewItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-stone-600 text-sm font-medium">{label}</span>
      <span className="text-stone-900 font-semibold capitalize">{value}</span>
    </div>
  );
}

type ProviderSelectProps = {
  label: string;
  providers: Provider[];
  value: string;
  onChange: (service_id: string) => void;
}

function ProviderSelect({
  label,
  providers,
  value,
  onChange,
}: ProviderSelectProps) {
  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>

      {/* Horizontal Scroll Section */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-transparent"
      >
        {providers.map((provider) => {
          const isSelected = provider.service_id === value;
          return (
            <motion.button
              key={provider.service_id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(provider.service_id)}
              className={`flex flex-col items-center justify-center shrink-0 min-w-[90px] md:min-w-[100px] p-4 rounded-2xl transition-all duration-300
                ${isSelected
                  ? "bg-gradient-to-b from-teal-50 to-white border-2 border-teal-500 shadow-lg"
                  : "bg-white border border-stone-200 hover:bg-stone-50 shadow-sm"
                }`}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-1 ring-stone-200 mb-2">
                <Image
                  src={provider.logo}
                  alt={provider.service_name}
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className={`text-xs md:text-sm font-medium ${isSelected ? "text-teal-700" : "text-stone-700"
                  } text-center truncate w-full`}
              >
                {provider.service_name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Optional hint */}
      <p className="w-full text-right text-xs text-stone-500 mt-0">
        Scroll sideways to see more providers →
      </p>
    </div>
  );
}

type PlanSelectProps = {
  label: string;
  value: Variation | null;
  onSelect: (variation: Variation) => void;
  variations: Variation[] | null;
  type: string;
}

function PlanSelect({
  label,
  value,
  onSelect,
  variations,
  type,
}: PlanSelectProps) {
  return (
    <div className="space-y-3 relative">
      {/* Label */}
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>

      {/* Plan Grid / Scroll */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-transparent py-1"
      >
        {variations?.map((item, index) => {
          const planStr =
            type === "data" ? item.data_plan : item.package_bouquet;
          const [planTitle, planSubtitle] = planStr
            ? stringArray(planStr, " - ")
            : ["--", "--"];

          const isSelected = value && value.variation_id === item.variation_id;

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => onSelect(item)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-all duration-300 shadow-sm border ${isSelected
                ? "bg-gradient-to-b from-teal-50 to-white border-teal-500 text-teal-700 shadow-md"
                : "bg-white border-stone-200 text-stone-800 hover:bg-stone-50"
                }`}
            >
              <span className="font-semibold text-sm">{planTitle}</span>
              <span
                className={`text-base md:text-lg font-bold ${isSelected ? "text-teal-600" : "text-primary"
                  }`}
              >
                {formatNGN(item.price)}
              </span>
              <span className="font-normal text-xs text-stone-500">
                {planSubtitle}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

type AmountGridProps = {
  type: string,
  value: string | number;
  onChange: (value: string) => void;
  presetAmounts: number[];
};

function AmountGrid({
  type,
  value,
  onChange,
  presetAmounts,
}: AmountGridProps) {
  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="text-sm font-semibold text-stone-700 block tracking-wide">
        Amount
      </label>

      {/* Preset Amount Buttons */}
      {type == "airtime" && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {presetAmounts.map((amt) => {
            const isSelected = value === amt.toString();

            return (
              <motion.button
                key={amt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange(amt.toString())}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 border text-sm
                ${isSelected
                    ? "border-teal-500 bg-gradient-to-r from-teal-500/10 to-teal-200 text-teal-700 shadow-[0_3px_8px_rgba(13,148,136,0.25)]"
                    : "border-stone-200 text-stone-700 bg-white hover:bg-stone-50 hover:border-stone-300"
                  }`}
              >
                ₦{amt.toLocaleString()}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Custom Amount Input */}
      <div className="relative mt-3">
        <input
          type="number"
          placeholder="Enter amount"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 font-medium 
            placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 
            focus:border-teal-400 transition-all duration-150"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 font-semibold">
          ₦
        </span>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  verify?: boolean;
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  verify = false,
}: InputFieldProps) {
  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <label className="text-sm font-semibold text-gray-700 tracking-wide">
        {label}
      </label>

      {/* Input Container */}
      <div className="flex items-center gap-2">
        <motion.input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 
          text-gray-900 font-medium placeholder:text-gray-400 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-teal-400/70 focus:border-teal-500
          transition-all duration-200"
        />

        {verify && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white 
            font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all duration-200"
            type="button"
          >
            Verify
          </motion.button>
        )}
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function SelectField({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="space-y-3 relative">
      <label className="text-sm font-semibold text-stone-700 block">
        {label}
      </label>

      <div
        className="relative border-2 border-stone-200 rounded-lg px-4 py-4 bg-white text-stone-800 font-medium cursor-pointer 
        focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 transition-all select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <span>{value || "Select an option"}</span>
          <ChevronDown
            className={`w-5 h-5 text-teal-600 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
              }`}
          />
        </div>

        {/* Dropdown List */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute z-20 left-0 top-[110%] w-full bg-white border-2 border-teal-100 rounded-xl shadow-lg overflow-hidden"
            >
              {options.length > 0 ? (
                options.map((opt, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`px-4 py-3 hover:bg-teal-50 transition-colors cursor-pointer ${value === opt ? "bg-teal-50 text-teal-700" : ""
                      }`}
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-stone-400">No options available</li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const ProviderSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-md font-normal text-stone-800">Select Provider</p>
      <div className="w-full grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProviderSkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}

const ProviderSkeletonCard = () => (
  <div className="w-full h-24 rounded-lg border border-stone-200 flex flex-col items-center justify-center gap-2 bg-white shadow-md animate-pulse">
    <div className="w-16 h-16 rounded-full bg-stone-200" />
    <div className="w-[60%] h-2 rounded-xl bg-stone-200" />
  </div>
);

const PlanSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* <p className="text-md font-normal text-stone-800">Select Data Plan</p> */}
      <div className="grid grid-cols-3 [@media(min-width:480px)]:grid-cols-4 [@media(min-width:676px)]:grid-cols-6 gap-2 w-full">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PlanSkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}

const PlanSkeletonCard = () => (
  <div className="w-full flex flex-col items-center justify-center gap-2 py-2 border-2 border-primary/50 rounded-xl bg-primary/5 shadow-sm animate-pulse">
    <div className="w-3/4 h-4 bg-primary/25 rounded-md" />
    <div className="w-1/2 h-4 bg-primary/25 rounded-md" />
    <div className="w-1/3 h-3 bg-primary/25 rounded-md" />
  </div>
);