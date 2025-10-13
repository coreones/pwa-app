import { PurchaseAction } from "@/types/api";

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
