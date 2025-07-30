"use client";

import React from "react";
import { User, UserForm as UserFormType } from "../../../types/user";

interface UserFormProps {
  form: UserFormType;
  isAdding: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  saveUser: () => void;
  cancelEdit: () => void;
  editingUser?: User | null;
}

const UserFormComponent: React.FC<UserFormProps> = ({
  form,
  isAdding,
  handleChange,
  saveUser,
  cancelEdit,
  editingUser,
}) => {
  return (
    <div className="bg-white shadow rounded p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isAdding ? "Add New Student" : `Edit Student: ${editingUser?.name}`}
      </h2>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={!isAdding}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={form.enrollmentYear || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="status"
          value={form.status || "Active"}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Graduated">Graduated</option>
          <option value="Dropped">Dropped</option>
        </select>

        {isAdding && (
          <input
            type="password"
            name="password"
            placeholder="Password (set initial)"
            value={form.password || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        )}

        <div className="flex space-x-4 pt-4 justify-end">
          <button
            onClick={cancelEdit}
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={saveUser}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormComponent;