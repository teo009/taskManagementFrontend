import { useState } from "react";

import { authApi } from "../api/auth.api";
import type { UserInterface } from "../types";


interface UseLoginReturn {
  login: (email: string, password: string) => Promise<UserInterface>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<UserInterface> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(email, password);
      return response.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("An errror has ocurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};