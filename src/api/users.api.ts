import { http } from "./http";

import type { CreateUserInterface, UserInterface } from "../types/user";

export const usersApi = {

  users: () => http<UserInterface[]>('/user'),

  create: (data: CreateUserInterface) => 
    http("/user/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
