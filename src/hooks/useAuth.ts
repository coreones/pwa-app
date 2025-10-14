"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFromCookie } from "@/lib/cookies";
import { getFromLocalStorage } from "@/lib/local-storage";
import { User } from "@/types/api";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getFromCookie("token");
    const get_user = getFromLocalStorage("user");
    if (!token) {
      router.push("/auth");
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
