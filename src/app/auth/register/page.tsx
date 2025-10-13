"use client";

import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return <Suspense fallback={<>...</>}><AuthForm type="register" /></Suspense>;
}