import { useState } from "react";
import { tasksApi } from "../api/tasks.api";

interface UseCreateTaskReturn {
  createTask: (name: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useCreateTask = (): UseCreateTaskReturn => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (name: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await tasksApi.create(name);
    } catch {
      setError("Error creating task");
      throw new Error("Create task failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask,
    loading,
    error,
  };
};
