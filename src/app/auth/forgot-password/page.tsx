"use client";

import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return <Suspense fallback={<>...</>}><AuthForm type="forgot-password" /></Suspense>;
}