"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../../../components/auth/registerForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row text-black">
     
      <div className="w-full md:w-1/2 bg-cyan-950 flex items-center justify-center p-8">
        <div className="max-w-md text-center text-white space-y-6">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-xl">Enter your personal details to join us</p>
          <div className="hidden md:block">
            <Image
              src="/pic.png"
              alt="Register Illustration"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-cyan-950">Register</h2>
            <p className="mt-2 text-gray-600">
              Fill in the form to create your account
            </p>
          </div>

          
          <RegisterForm />

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-cyan-600 hover:text-cyan-800"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
