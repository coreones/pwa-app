"use client";

import React from "react";
import PaymentFlow from "@/components/PaymentFlow";

export default function page() {
  return (
    <div className="container">
      <PaymentFlow type={"bankTransaction"} />
    </div>
  );
}
