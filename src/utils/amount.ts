export const formatNGNOld = (amount: number | string = 0) => {
  return `₦${parseInt(amount.toString()).toLocaleString() ?? 0.0}`;
};

export const formatNGN = (amount: number | string = 0): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};
