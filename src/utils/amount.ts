export const formatNGN = (amount: number | string = 0) => {
  return `₦${parseInt(amount.toString()).toLocaleString() ?? 0.0}`;
};
