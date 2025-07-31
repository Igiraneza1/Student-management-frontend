"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/auth/loginForm";
import Image from "next/image";
import Link from "next/link";

type LoginResponse = {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleLogin = async (formData: { email: string; password: string }) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: LoginResponse = await response.json();

    // Handle error responses
    if (!response.ok) {
      throw new Error(data.message || "Login failed. Please check your credentials.");
    }

    if (!data.token || !data.user?.role) {
      throw new Error("Invalid server response format");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const redirectPath = data.user.role === "admin" 
      ? "/admin/dashboard" 
      : "/profile";

    router.push(redirectPath);

  } catch (err: unknown) {
    let errorMessage = "Login failed. Please try again.";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row  text-black">
      
      <div className="w-full md:w-1/2 bg-cyan-950 flex items-center justify-center p-8">
        <div className="max-w-md text-center text-white space-y-6">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-xl">To keep connected with us, please login with your personal info</p>
          <div className="hidden md:block">
            <Image
  src="/pic.png"  
  alt="Login Illustration"
  width={400}
  height={400}
  className="mx-auto w-full"
/>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-cyan-950">Sign in</h2>
            <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
          </div>

          <LoginForm
            onSubmit={handleLogin}
            error={error}
            loading={loading}
          />

          <div className="text-center text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-cyan-600 hover:text-cyan-800"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}