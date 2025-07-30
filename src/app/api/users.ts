import { User, UserForm, UserRole } from "../types/user";

const API_URL = "http://localhost:5000/api/v1/users";

export const fetchUsers = async (role?: string): Promise<User[]> => {
  const url = role ? `${API_URL}?role=${role}` : API_URL;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

export const createUser = async (userData: Omit<UserForm, '_id'>): Promise<{ user: User }> => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add user");
  return data;
};

export const updateUser = async (id: string, userData: Partial<UserForm>): Promise<{ user: User }> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update user");
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete user");
};

export const updateUserRole = async (id: string, role: UserRole): Promise<{ user: User }> => {
  const res = await fetch(`${API_URL}/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update role");
  return data;
};