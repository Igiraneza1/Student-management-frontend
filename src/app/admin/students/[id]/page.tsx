'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProtectedRoute from '../../../../components/common/protectedRoute';

type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course?: string;
  enrollmentYear?: string;
};

export default function StudentDetailPage() {
  const params = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudent(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchStudent();
    }
  }, [params.id]);

  if (loading) return <div className="p-8">Loading student details...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!student) return <div className="p-8">Student not found</div>;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Student Details</h1>
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-lg">{student.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg">{student.email}</p>
            </div>
            {student.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-lg">{student.phone}</p>
              </div>
            )}
            {student.course && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <p className="mt-1 text-lg">{student.course}</p>
              </div>
            )}
            {student.enrollmentYear && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Enrollment Year</label>
                <p className="mt-1 text-lg">{student.enrollmentYear}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
