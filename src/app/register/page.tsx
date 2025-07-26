import React from "react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="grid grid-cols-2 bg-gray-100 h-screen">
      <div className="bg-blue-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-semibold">Join Us Today!</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-blue-500 text-center p-10 font-bold">
          Create Account
        </h1>
        <form className="flex flex-col w-full max-w-md space-y-4">

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
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
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="regNo" className="mb-1 text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              id="regNo"
              type="number"
              placeholder="Enter your registration number"
              className="border-2 border-gray-300 text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="text" className="mb-1 text-sm font-medium text-gray-700">
              Field of study
            </label>
            <input
              id="text"
              type="text"
              placeholder="Enter your field"
              className="border-2 border-gray-300  text-black rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <Link
              href="/login"

              className="bg-gray-100 text-sm rounded-full text-blue-500 px-8 py-2 font-bold hover:bg-blue-600 hover:text-white transition text-center"
              
              
            >
              Login
            </Link>

            <Link
              href="/register"
              
              className="bg-blue-500 text-sm rounded-full text-white px-8 py-2 font-bold hover:bg-blue-600 transition text-center"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
