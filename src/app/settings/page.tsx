"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [form, setForm] = useState({ registrationNumber: "", fieldOfStudy: "" });
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setForm({
      registrationNumber: storedUser.registrationNumber || "",
      fieldOfStudy: storedUser.fieldOfStudy || "",
    });
    setUserId(storedUser._id); // store user ID for backend call
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!userId || !token) return alert("User not found or not authenticated");

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedUser = await res.json();

      // update localStorage and redirect
      localStorage.setItem("user", JSON.stringify(updatedUser));
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold text-blue-500">Edit Your Info</h1>
      <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <div>
          <label htmlFor="registrationNumber" className="block mb-1 text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            value={form.registrationNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="fieldOfStudy" className="block mb-1 text-sm font-medium text-gray-700">
            Field of Study
          </label>
          <input
            id="fieldOfStudy"
            name="fieldOfStudy"
            type="text"
            value={form.fieldOfStudy}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
