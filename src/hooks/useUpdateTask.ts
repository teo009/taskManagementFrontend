import { useState } from "react";

import type { TaskStatus } from "../types";
import { tasksApi } from "../api/tasks.api";

interface UseUpdateTaskStatusReturn {
  updateStatus: (taskId: number, status: TaskStatus) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useUpdateTaskStatus = (): UseUpdateTaskStatusReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (taskId: number, status: TaskStatus) => {
    setLoading(true);
    setError(null);

    try {
      await tasksApi.update(taskId, status);
    } catch {
      setError("Error updating task status");
      throw new Error("Update task status failed");
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};