export type UserRole = "user" | "admin";

export interface UserInterface {
  id: number;
  email: string;
  full_name: string;
  password?: string;
  role: UserRole;
  created_at: string;
}

export interface CreateUserInterface {
  email: string,
  full_name: string,
  password: string,
}
