"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    registrationNumber: "",
    fieldOfStudy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(form));

    router.push("/login");
  };

  return (
    <div className="grid grid-cols-2 bg-gray-100 h-screen">
      <div className="bg-blue-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-semibold">Join Us Today!</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-blue-500 text-center p-10 font-bold">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md space-y-4">
          
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
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
              required
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="registrationNumber" className="mb-1 text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              id="registrationNumber"
              name="registrationNumber"
              type="number"
              required
              placeholder="Enter your registration number"
              value={form.registrationNumber}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fieldOfStudy" className="mb-1 text-sm font-medium text-gray-700">
              Field of Study
            </label>
            <input
              id="fieldOfStudy"
              name="fieldOfStudy"
              type="text"
              required
              placeholder="Enter your field of study"
              value={form.fieldOfStudy}
              onChange={handleChange}
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <Link
              href="/login"
              className="bg-gray-100 text-sm rounded-full text-blue-500 px-8 py-2 font-bold hover:bg-blue-600 hover:text-white transition text-center"
            >
              Login
            </Link>

            <button
              type="submit"
              className="bg-blue-500 text-sm rounded-full text-white px-8 py-2 font-bold hover:bg-blue-600 transition text-center"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
