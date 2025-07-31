import { User } from "@/types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};