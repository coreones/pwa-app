"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "./useAuth";

export const usePin = () => {
  const { loading } = useAuth();
  const [hasPin, setHasPin] = useState<boolean>(false);
  const [pinConfirmationLoading, setPinConfirmationLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const checkPinStatus = async () => {
      try {
        const res = await api.get("/user/has-set-pin");
        if (!res.data.error && res.data.data) setHasPin(true);
      } catch (err) {
      } finally {
        setPinConfirmationLoading(false);
      }
    };
    if (loading) checkPinStatus();
  }, [loading]);

  return { hasPin, pinConfirmationLoading };
};
