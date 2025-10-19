import { PurchaseAction } from "@/types/api";
import {
  ArrowRightLeft,
  Download,
  Gift,
  GraduationCap,
  Home,
  Lightbulb,
  PhoneCall,
  Plane,
  Plus,
  PlusCircle,
  Send,
  Tv,
  Upload,
  Volleyball,
  Wifi,
} from "lucide-react";
import { title } from "process";

export const stringArray = (value: string, splitter: string = "-") => {
  let array = value.trim().toString().split(splitter);
  if (array.length == 0) {
    array = ["", ""];
  } else if (array.length == 1) {
    array = [array[0].trim(), ""];
  } else if (array.length == 2) {
    array = [array[0].trim(), array[1].trim()];
  } else if (array.length == 3) {
    array = [array[0].trim(), array[1].trim(), array[2].trim()];
  } else if (array.length > 3) {
    array = [
      array[0].trim(),
      array[1].trim(),
      array[2].trim(),
      array[3].trim(),
    ];
  }
  return array;
};

export const customerLabel = (type: PurchaseAction) => {
  if (["airtime", "data"].includes(type)) {
    return "Phone Number";
  } else if (["tv"].includes(type)) {
    return "Smartcard Number";
  } else if (["electricity"].includes(type)) {
    return "Meter Number";
  } else if (["betting"].includes(type)) {
    return "Account ID";
  } else {
    return "";
  }
};

export const pinExtractor = (otp: string[]) => {
  if (Array.isArray(otp)) {
    return otp.join().replaceAll(" ", "").replaceAll(",", "").trim();
  }
  return "";
};

export const features = [
  {
    id: "receive",
    name: "Receive",
    title: "Money Received",
    icon: Plus,
    link: "/app/receive",
    showInHome: false,
    purchaseable: false,
  },
  {
    id: "send",
    name: "Send",
    title: "Money Sent",
    icon: Send,
    link: "/app/transfer",
    showInHome: false,
    purchaseable: false,
  },
  {
    id: "data",
    name: "Sub",
    title: "Data Purchase",
    icon: Wifi,
    link: "/app/payments/data",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "airtime",
    name: "Airtime",
    title: "Airtime Purchase",
    icon: PhoneCall,
    link: "/app/payments/airtime",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "electricity",
    name: "Light",
    title: "Electricity Token",
    icon: Lightbulb,
    link: "/app/payments/electricity",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "tv",
    name: "Cable/TV",
    title: "Cable/TV Subscription",
    icon: Tv,
    link: "/app/payments/tv",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "flight",
    name: "JAPA",
    title: "Flight Booking",
    icon: Plane,
    link: "",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "giftcard",
    name: "Gift Card",
    title: "Gift Card",
    icon: Gift,
    link: "",
    showInHome: true,
    purchaseable: false,
  },
  {
    id: "betting",
    name: "Gamble",
    title: "Betting Topup",
    icon: Volleyball,
    link: "/app/payments/betting",
    showInHome: true,
    purchaseable: true,
  },
  {
    id: "education",
    name: "School",
    title: "School",
    icon: GraduationCap,
    link: "",
    showInHome: true,
    purchaseable: false,
  },
  {
    id: "transactions",
    name: "Transactions",
    title: "Transactions",
    icon: ArrowRightLeft,
    link: "app/history",
    showInHome: true,
    purchaseable: false,
  },
  {
    id: "fund_received",
    name: "Fund Received",
    title: "Fund Received",
    icon: Download,
    link: "",
    showInHome: false,
    purchaseable: false,
  },
  {
    id: "fund_transfer",
    name: "Fund Tansfer",
    title: "Fund Tansfer",
    icon: Upload,
    link: "",
    showInHome: false,
    purchaseable: false,
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    title: "Inter Bank Transfer",
    icon: Home,
    link: "",
    showInHome: false,
    purchaseable: false,
  },
  {
    id: "wallet_topup",
    name: "Wallet Topup",
    title: "Wallet Funding",
    icon: PlusCircle,
    link: "",
    showInHome: false,
    purchaseable: false,
  },
];

export const getFeatureData = (_id: string) => {
  const id = _id.trim().toLowerCase();
  if (id) {
    return features.find((feature) => feature.id === id);
  }
  return null;
};

export const statusLabel = (_status: string) => {
  const status = _status.trim().toLowerCase();
  if (status === "completed")
    return "<span class='bg-lime-50 border border-lime-300 text-lime-600 px-2 py-0.5 rounded-full text-xs font-medium'>Completed</span>";
  else if (status === "failed")
    return "<span class='bg-rose-50 border border-rose-300 text-rose-600 px-2 py-0.5 rounded-full text-xs font-medium'>Failed</span>";
  else if (status === "pending")
    return "<span class='bg-amber-50 border border-amber3200 text-amber-600 px-2 py-0.5 rounded-full text-xs font-medium'>Pending</span>";
  else
    return "<span class='bg-zinc-50 border border-zinc-300 text-zinc-600 px-2 py-0.5 rounded-full text-xs font-medium'>Incomplete</span>";
};
