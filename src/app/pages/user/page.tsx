"use client";

import { useEffect, useState } from "react";
import User from "../../types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authenticated.");
      return;
    }

    fetch("http://localhost:5000/api/v1/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Access denied");
        }
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        console.error(err);
        setError("You are not authorized to view users.");
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">All Students</h1>

      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 && !error ? (
        <p>No Student found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-200 text-black text-left">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Reg. Number</th>
              <th className="p-3 border">Field of Study</th>
              <th className="p-3 border">Year of attempt</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id || u.id} className="hover:border-2">
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.registrationNumber}</td>
                <td className="p-3 border">{u.fieldOfStudy}</td>
                <td className="p-3 border">{u.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
