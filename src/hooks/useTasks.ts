import { useEffect, useState, useCallback } from "react";

import { tasksApi } from "../api/tasks.api";
import type { TaskInterface } from "../types";

interface UseTasksReturn {
  tasks: Array<TaskInterface>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await tasksApi.tasks();
      setTasks(response);
    } catch {
      setError("Error loading tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks() }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};
