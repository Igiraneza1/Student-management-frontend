
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return router.push("/login");
    setUser(JSON.parse(stored));
  }, [router]);

  const handleDelete = () => {
    if (window.confirm("Click OK to delete")) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      router.push("/register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold text-blue-500">Your Profile</h1>

      {user && (
        <div className="bg-white p-6 rounded shadow-md w-96 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Reg Number:</strong> {user.registrationNumber}</p>
          <p><strong>Field of Study:</strong> {user.fieldOfStudy}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/settings")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Profile
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
