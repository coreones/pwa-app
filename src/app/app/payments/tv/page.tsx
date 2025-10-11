"use client";

import React from "react";
import PaymentFlow from "../components/PaymentFlow";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white">
      <PaymentFlow type={"tv"} />
    </div>
  );
}
