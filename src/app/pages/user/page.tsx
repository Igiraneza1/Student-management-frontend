"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  course?: string;
  enrollmentYear?: string;
  status?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userData || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/v1/users/profile", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          alert(data.message || "Failed to delete account");
          return;
        }

        alert("Account deleted successfully");
        localStorage.clear();
        router.push("/login");
      } catch {
        alert("Network error: Failed to delete account");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Dashboard</h1>
      

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome, {user.name} 🎓
        </h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.course && (
          <p>
            <strong>Course:</strong> {user.course}
          </p>
        )}
        {user.enrollmentYear && (
          <p>
            <strong>Enrollment Year:</strong> {user.enrollmentYear}
          </p>
        )}
        {user.status && (
          <p>
            <strong>Status:</strong> {user.status}
          </p>
        )}
      </div>

      <div className="flex space-x-4 mt-8 justify-center">
        <button
          onClick={() => router.push("/profile/edit")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
        >
          Edit Profile
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
        >
          Delete Account
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
