import { useState } from "react";
import { authApi } from "../api/auth.api";

interface UseLogoutReturn {
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogout = (): UseLogoutReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await authApi.logout();
    } catch (err) {
      setError("Failed to log out");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
