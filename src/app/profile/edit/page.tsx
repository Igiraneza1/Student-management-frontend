"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  course?: string;
  enrollmentYear?: string;
  status?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentYear: "",
    status: "Active",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const user: User = JSON.parse(userData);
    setForm({
      name: user.name || "",
      email: user.email || "",
      course: user.course || "",
      enrollmentYear: user.enrollmentYear || "",
      status: user.status || "Active",
      password: "",
    });
    setLoading(false);
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/v1/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Profile updated successfully");
      router.push("/dashboard");
    } catch {
      setError("Network error: Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Course</label>
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Enrollment Year
          </label>
          <input
            type="text"
            name="enrollmentYear"
            value={form.enrollmentYear}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          >
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Password (leave blank to keep current)
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>

        {error && <p className="text-red-600 font-medium">{error}</p>}

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
          >
            Update Profile
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
