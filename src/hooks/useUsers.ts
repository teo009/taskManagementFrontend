import React from "react";

import { usersApi } from "../api/users.api";
import type { UserInterface } from "../types";

export const useUsers = () => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersApi.users();
      setUsers(response);
    } catch {
      setError("Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};
