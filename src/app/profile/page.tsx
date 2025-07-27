
"use client"; 

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("Not authenticated");

      const res = await fetch("http://localhost:5000/api/users/<userId>", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        return setError(err.message);
      }

      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
        <>
          <h2 className="text-2xl font-bold">Welcome, {profile.email}</h2>
          <p>Reg No: {profile.registrationNumber}</p>
          <p>Field: {profile.fieldOfStudy}</p>
        </>
      )}
    </div>
  );
}
