"use client";

import React, { useEffect, useState } from "react";
import { User, UserRole } from "../../../types/user";
import UserForm from "../form/page";
import UsersTable from "../table/page";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser as apiDeleteUser,
  updateUserRole as apiUpdateUserRole,
} from "../../../api/users";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  startEdit: (user: User) => void;
  deleteUser: (id: string) => void;
  toggleRole: (user: User, newRole: UserRole) => void | Promise<void>;
}

interface UserFormState {
  name?: string;
  email?: string;
  course?: string;
  password?: string;
  status?: string;
  enrollmentYear?: number | string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserFormState>({});
  const [isAdding, setIsAdding] = useState(false);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUsers("student");
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching users");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setForm(user);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setForm({});
    setIsAdding(false);
  };

  const saveUser = async () => {
    setError("");
    try {
      if (isAdding) {
        const newUser = await createUser({
          name: form.name,
          email: form.email,
          course: form.course,
          enrollmentYear: form.enrollmentYear
            ? Number(form.enrollmentYear)
            : undefined,
          password: form.password,
          role: "student",
          status: form.status || "Active",
        });
        setUsers((prev) => [...prev, newUser.user]);
      } else if (editingUser) {
        await updateUser(editingUser._id, {
          name: form.name,
          email: form.email,
          course: form.course,
          enrollmentYear: form.enrollmentYear
            ? Number(form.enrollmentYear)
            : undefined,
          status: form.status,
        });
        setUsers((prev) =>
          prev.map((u) =>
            u._id === editingUser._id
              ? {
                  ...u,
                  ...form,
                  enrollmentYear:
                    form.enrollmentYear === undefined ||
                    form.enrollmentYear === ""
                      ? undefined
                      : typeof form.enrollmentYear === "number"
                      ? form.enrollmentYear
                      : Number(form.enrollmentYear),
                }
              : u
          )
        );
      }
      cancelEdit();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save user");
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiDeleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleToggleRole = async (user: User, newRole: UserRole) => {
    try {
      await apiUpdateUserRole(user._id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to change role");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard - Manage Students
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      <UsersTable
        users={users}
        loading={loading}
        startEdit={startEdit}
        deleteUser={handleDeleteUser}
        toggleRole={handleToggleRole}
      />

      {(editingUser || isAdding) && (
        <UserForm
          form={{
            ...form,
            enrollmentYear:
              form.enrollmentYear === undefined || form.enrollmentYear === ""
                ? undefined
                : typeof form.enrollmentYear === "number"
                ? form.enrollmentYear
                : Number(form.enrollmentYear),
          }}
          isAdding={isAdding}
          handleChange={handleChange}
          saveUser={saveUser}
          cancelEdit={cancelEdit}
          editingUser={editingUser}
        />
      )}

      {!editingUser && !isAdding && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setForm({});
              setIsAdding(true);
              setEditingUser(null);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add New Student
          </button>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
