export type UserRole = "admin" | "student";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends User {
  course: string;
  enrollmentYear: number;
  status: "Active" | "Graduated" | "Dropped";
}

export interface UserForm {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role?: UserRole;
  profilePicture?: string;
  course?: string;
  enrollmentYear?: number;
  status?: "Active" | "Graduated" | "Dropped";
}