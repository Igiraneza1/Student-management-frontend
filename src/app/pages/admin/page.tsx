
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/app/types/user";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");
    if (role !== "admin") {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser || "{}"));
    }
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin Dashboard</h1>
      {user && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}
