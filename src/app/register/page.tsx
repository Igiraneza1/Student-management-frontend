"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isValidEmail } from "../utils/emailValidator";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    enrollmentYear: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setError("Please provide a valid email.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Registration failed: " + (data.message || "Unknown error"));
        return;
      }

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed due to network error");
    }
  };

  return (
    <div className="grid grid-cols-2 bg-gray-100 h-screen">
      <div className="bg-blue-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-semibold">Join Us Today!</h1>
      </div>

      <div className="flex flex-col justify-center items-center bg-gray-100 p-10">
        <h1 className="text-3xl text-blue-500 text-center p-10 font-bold">
          Student Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="course" className="mb-1 text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="Enter your course"
              value={form.course}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="enrollmentYear" className="mb-1 text-sm font-medium text-gray-700">
              Enrollment Year
            </label>
            <input
              id="enrollmentYear"
              name="enrollmentYear"
              type="text"
              placeholder="e.g. 2025"
              value={form.enrollmentYear}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            >
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>

          {error && <p className="text-red-600 font-medium">{error}</p>}

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="bg-blue-500 text-sm rounded-full text-white px-8 py-2 font-bold hover:bg-blue-600 transition text-center"
            >
              Register
            </button>

            <Link
              href="/login"
              className="bg-gray-100 text-sm rounded-full text-blue-500 px-8 py-2 font-bold hover:bg-blue-600 hover:text-white transition text-center"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
