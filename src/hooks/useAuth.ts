import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientCookie } from "@/lib/cookies";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getClientCookie("accessToken");
    if (!token) {
      router.push("/auth/login");
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { loading, authenticated };
};
