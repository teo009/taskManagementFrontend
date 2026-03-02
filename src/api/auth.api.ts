import { http } from "./http";

import type { UserInterface } from "../types";

export const authApi = {
  getMe: () => http<UserInterface>("/user/auth/me"),

  login: (email: string, password: string) =>
    http<{ user: UserInterface }>("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    http<void>("/user/logout", {
      method: "POST",
      body: JSON.stringify({}),
    }),
};