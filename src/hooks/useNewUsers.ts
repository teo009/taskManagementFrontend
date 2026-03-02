import { useState } from "react";

import { usersApi } from "../api/users.api";
import type { CreateUserInterface } from "../types";

interface UseCreateUserReturn {
  createUser: (data: CreateUserInterface) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useCreateUser = (): UseCreateUserReturn => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserInterface): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await usersApi.create(data);
    } catch {
      setError("Error creating user");
      throw new Error("Create user failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    loading,
    error,
  };
};
