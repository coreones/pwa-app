"use client";
import { useEffect, useState } from "react";
import { Wallet } from "@/types/api";
import api from "@/lib/axios";

export const useWallet = () => {
  const [loading, setLoading] = useState(true);
  const [hasBalance, setHasBalance] = useState(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const getWallet = async () => {
      const res = await api.get("/user/wallet");
      if (!res.data.error) {
        setHasBalance(Number(res.data.data.balance) > 0);
        setWallet(res.data.data);
      }
    };
    getWallet();
    setLoading(false);
  }, []);

  return { loading, wallet, hasBalance };
};
