export type UserRole = "student" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  course?: string;
  enrollmentYear?: number;
  role: UserRole;
  status?: string;
}

export interface UserForm extends Partial<User> {
  password?: string;
}