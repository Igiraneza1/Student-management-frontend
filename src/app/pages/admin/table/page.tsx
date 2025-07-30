"use client";

import React from "react";
import { User } from "../../../types/user";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  startEdit: (user: User) => void;
  deleteUser: (id: string) => void;
  toggleRole: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  startEdit,
  deleteUser,
  toggleRole,
}) => {
  return (
    <div className="overflow-x-auto border rounded mb-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Course</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Enrollment Year</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Role</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No students found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.course || "-"}</td>
                <td className="px-4 py-2">{user.enrollmentYear || "-"}</td>
                <td className="px-4 py-2">{user.status || "Active"}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    title="Delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleRole(user)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    title={`Make ${user.role === "admin" ? "student" : "admin"}`}
                  >
                    {user.role === "admin" ? "Demote to Student" : "Promote to Admin"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;