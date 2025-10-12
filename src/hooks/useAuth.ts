"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientCookie } from "@/lib/cookies";
import { getClientLocalStorage } from "@/lib/local-storage";
import { User } from "@/types/api";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getClientCookie("accessToken");
    const get_user = getClientLocalStorage("user");
    if (!token) {
      router.push("/auth/login");
    } else {
      if (get_user) {
        setUser(JSON.parse(get_user));
      }
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { loading, user, authenticated };
};
