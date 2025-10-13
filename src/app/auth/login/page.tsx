"use client";

import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";

export default function LoginPage() {
  return <Suspense fallback={<>...</>}><AuthForm type="login" /></Suspense>;
}