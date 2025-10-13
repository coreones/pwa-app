"use client"
import AddFunds from "@/components/modal/payments/add-funds";
import React from "react";

export default function page() {
  return <AddFunds close={() => window.history.back()} />;
}
