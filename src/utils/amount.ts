export const formatNGN = (amount: number = 0) => {
  return `₦${Number(amount).toFixed(2) ?? 0.0}`;
};
