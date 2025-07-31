import { Student } from "../../types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${API_URL}/students`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

export const getStudent = async (id: string): Promise<Student> => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }
  return response.json();
};

export const createStudent = async (student: Omit<Student, "_id">): Promise<Student> => {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Failed to create student");
  }
  return response.json();
};

export const updateStudent = async (id: string, student: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  return response.json();
};

export const deleteStudent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
};