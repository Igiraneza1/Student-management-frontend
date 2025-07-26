"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUsers([JSON.parse(stored)]);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">All Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Reg. Number</th>
              <th className="p-2 border">Field of Study</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{u.registrationNumber}</td>
                <td className="border p-2">{u.fieldOfStudy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
