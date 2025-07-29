"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "../types/user"; 

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    registrationNumber: "",
    fieldOfStudy: "",
    year: "",
    role: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("Not authenticated");

      try {
        const res = await fetch("http://localhost:5000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          return setError(err.message || "Failed to load profile");
        }

        const user = await res.json();
        setProfile(user);
        setFormData({
          email: user.email,
          registrationNumber: user.registrationNumber,
          fieldOfStudy: user.fieldOfStudy,
          year: user.year || "",
          role: user.role || "",
        });
      } catch {
        setError("Network error");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Not authenticated");

    try {
      const res = await fetch("http://localhost:5000/api/v1/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        return setError(err.message || "Update failed");
      }

      alert("Profile updated successfully");
    } catch {
      setError("Update failed");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Not authenticated");

    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:5000/api/v1/users/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        return setError(err.message || "Delete failed");
      }

      alert("Account deleted");
      localStorage.removeItem("token");
      router.push("/login");
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        <label className="block">
          Email:
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Registration Number:
          <input
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="block w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Field of Study:
          <input
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="block w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Year:
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="block w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Role:
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled
            className="block w-full border bg-gray-100 rounded p-2 mt-1"
          />
        </label>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
