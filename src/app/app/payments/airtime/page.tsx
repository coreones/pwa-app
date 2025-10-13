"use client";

import React from "react";
import PaymentFlow from "@/components/PaymentFlow";

export default function PaymentPage() {
  return (
    <div className="container">
      <PaymentFlow type={"airtime"} />
    </div>
  );
}
