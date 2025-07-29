"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/app/types/user";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState("");

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
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError("Could not load users.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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
    const token = localStorage.getItem("token");
    try {
      if (editingUser) {
        const res = await fetch(`http://localhost:5000/api/v1/users/${editingUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingUser),
        });

        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setUsers(users.map((u) => (u._id === updated.user._id ? updated.user : u)));
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      {error && <p className="text-red-500">{error}</p>}

      {users.map((u) => (
        <div key={u._id} className="bg-gray-100 p-4 rounded mb-4">
          {editingUser?._id === u._id ? (
            <div className="space-y-2">
              <input name="name" value={editingUser.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
              <input name="email" value={editingUser.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
              <input name="course" value={editingUser.course} onChange={handleChange} placeholder="Course" className="border p-2 w-full" />
              <input name="enrollmentYear" value={editingUser.enrollmentYear} onChange={handleChange} placeholder="Enrollment Year" className="border p-2 w-full" />
              <select name="status" value={editingUser.status} onChange={handleChange} className="border p-2 w-full">
                <option value="Active">Active</option>
                <option value="Graduated">Graduated</option>
                <option value="Dropped">Dropped</option>
              </select>
              <select name="role" value={editingUser.role} onChange={handleChange} className="border p-2 w-full">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex gap-2">
                <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Course:</strong> {u.course}</p>
              <p><strong>Year:</strong> {u.enrollmentYear}</p>
              <p><strong>Status:</strong> {u.status}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <div className="mt-2">
                <button onClick={() => handleEdit(u)} className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
