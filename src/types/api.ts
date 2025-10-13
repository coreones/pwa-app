export type ApiResponse<T = any> = {
  error: boolean;
  message: string;
  data: T | null;
};

export type MultiLoginResponse = {
  success: boolean;
  message: "close_other_running_session";
  data: null;
};

export type BankAccount = {
  id?: number;
  user_id?: number;
  bank_name?: string | null;
  bank_code?: string | null;
  account_name?: string | null;
  account_number?: string | null;
  account_id?: string | null;
  account_reference?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type Notification = {
  id?: number;
  user_id?: number;
  reference?: string;
  title?: string | null;
  body?: string | null;
  status?: "read" | "unread";
  extra?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type TransactionStatus = "pending" | "completed" | "failed" | "reversed";
export type TransactionAction =
  | "airtime"
  | "data"
  | "electricity"
  | "betting"
  | "fund_sent"
  | "fund_eceived"
  | "wallet_topup"
  | "bank_transfer"
  | "tv"
  | "flight_booking";

export type Transaction = {
  id?: number;
  user_id?: number;
  reference?: string;
  session_id?: string | null;
  type?: "credit" | "debit";
  action?: TransactionAction;
  amount?: number;
  fee?: number;
  balance_before?: number;
  balance_after?: number;
  status?: TransactionStatus;
  wallet?: string;
  description?: string | null;
  extra?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type User = {
  id?: number;
  uid?: string | null;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  middlename?: string | null;
  referral_code?: string | null;
  referrer_id?: number | null;
  gender?: "male" | "female" | null;
  type?: "user" | "admin";
  dob?: string | null;
  photo?: string | null;
  device_code?: string | null;
  pnd?: boolean;
  level?: "0" | "1" | "2" | "3" | "4" | "5";
  pin?: string | null;
  bank_provider_id?: string | null;
  house_number?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipcode?: string | null;
  address?: string | null;
  phone_verification_otp?: string | null;
  phone_verified?: "0" | "1";
  email_verification_otp?: string | null;
  email_verified?: "0" | "1";
  bvn?: string | null;
  bvn_verification_status?: "0" | "1";
  bvn_data?: string | null;
  nin?: string | null;
  nin_verification_status?: "0" | "1";
  nin_data?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type Wallet = {
  id?: number;
  user_id?: number;
  balance?: number;
  locked?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export function formatTransactionLabel(
  value: TransactionStatus | TransactionAction
): string {
  const map: Record<string, string> = {
    fund_received: "Fund Received",
    fund_sent: "Fund Sent",
    wallet_topup: "Wallet Top-Up",
    bank_transfer: "Bank Transfer",
    flight_booking: "Flight Booking",
  };

  if (map[value]) return map[value];

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
