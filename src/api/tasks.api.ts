import { http } from "./http";

import type { TaskInterface, TaskStatus } from "../types";

export const tasksApi = {

  tasks: () => http<TaskInterface[]>('/task/all/'),

  update: (taskId: number, status: TaskStatus) =>
    http<TaskInterface>(`/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  create: (name: string) =>
    http("/task", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
};
