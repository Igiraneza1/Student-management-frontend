"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Student } from "../../types/index";
import { createStudent, updateStudent, getStudent } from "../../lib/api/student";
export default function StudentForm({ studentId }: { studentId?: string }) {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    email: "",
    course: "",
    enrollmentYear: new Date().getFullYear(),
    status: "Active",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (studentId) {
      const fetchStudent = async () => {
        try {
          const student = await getStudent(studentId);
          setFormData(student);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load student");
        }
      };
      fetchStudent();
    }
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "enrollmentYear" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (studentId) {
        await updateStudent(studentId, formData);
      } else {
        await createStudent(formData as Omit<Student, "_id">);
      }
      router.push("/admin/students");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
          disabled={!!studentId}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <input
          type="text"
          name="course"
          value={formData.course || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Enrollment Year</label>
        <input
          type="number"
          name="enrollmentYear"
          value={formData.enrollmentYear || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status || "Active"}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        >
          <option value="Active">Active</option>
          <option value="Graduated">Graduated</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/students")}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}