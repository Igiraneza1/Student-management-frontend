'use client'
import { useState, useEffect } from "react";
import ProfileForm from "../../components/profile/profilrForm";
import ProtectedRoute from "../../components/common/protectedRoute";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  // add other fields as needed
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const response = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user || data); 
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <ProtectedRoute allowedRoles={["admin", "student"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Profile</h1>
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          {user ? <ProfileForm user={user} /> : <div>No user data</div>}
        </div>
      </div>
    </ProtectedRoute>
  );
}
