"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!isAuthenticated) return null; // ❌ Don't render if not logged in

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link href="/home" className="mr-4">Home</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <button onClick={handleLogout} className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200">
        Logout
      </button>
    </nav>
  );
}
