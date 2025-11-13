"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "./useAuth";

export const usePin = () => {
  const { loading, authenticated } = useAuth();
  const [hasPin, setHasPin] = useState<boolean>(false);
  const [pinConfirmationLoading, setPinConfirmationLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const checkPinStatus = async () => {
      try {
        const res = await api.get("/user/has-set-pin");
        if (!res.data.error && res.data.data) setHasPin(res.data.data);
      } catch (err) {
      } finally {
        setPinConfirmationLoading(false);
      }
    };
    if (!loading && authenticated) checkPinStatus();
  }, [loading, authenticated]);

  return { hasPin, pinConfirmationLoading };
};
