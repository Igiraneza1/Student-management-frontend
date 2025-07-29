"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/app/types/user";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (role !== "admin") {
      router.push("/login");
    } else {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/v1/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    try {
      if (editingUser) {
        const res = await fetch(`/api/v1/users/${editingUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin Dashboard</h1>

      {user && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Manage Users</h2>

      {users.map((u) => (
        <div key={u._id} className="bg-gray-100 p-4 rounded mb-4">
          {editingUser?._id === u._id ? (
            <>
              <input
                type="text"
                name="email"
                value={editingUser.email}
                onChange={handleChange}
                className="border p-2 mr-2"
              />
              <input
                type="text"
                name="role"
                value={editingUser.role}
                onChange={handleChange}
                className="border p-2 mr-2"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
