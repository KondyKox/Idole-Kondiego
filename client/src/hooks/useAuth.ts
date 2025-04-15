import { useEffect, useState } from "react";
import UserProps from "../types/User";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "ANOBIBLIA_TOKEN"; // localStorage key

export const useAuth = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) setUser(null);
      else {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Authorization error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
  };
};
