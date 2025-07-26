"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const isMatch =
      (form.username === storedUser.username || form.username === storedUser.email) &&
      form.password === storedUser.password;

    if (isMatch) {
      localStorage.setItem("loggedIn", "true");
      router.push("/profile");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="grid grid-cols-2 bg-gray-100 h-screen">
   
      <div className="bg-blue-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-semibold">Welcome Back!</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-blue-500 text-center p-10 font-bold">
          Student Management System
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username or email"
              value={form.username}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="bg-blue-500 text-sm rounded-full text-white px-8 py-2 font-bold hover:bg-blue-600 transition text-center"
            >
              Login
            </button>

            <Link
              href="/register"
              className="bg-gray-100 text-sm rounded-full text-blue-500 px-8 py-2 font-bold hover:bg-blue-600 hover:text-white transition text-center"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
