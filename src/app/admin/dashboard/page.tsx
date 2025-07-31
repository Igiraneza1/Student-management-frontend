import { Suspense } from "react";
import Link from "next/link";
import StatsCard from "../../../components/admin/card";
import StudentTable from "../../../components/admin/studentTable";
import ProtectedRoute from "../../../components/common/protectedRoute"

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Suspense fallback={<div>Loading stats...</div>}>
            <StatsCard title="Total Students" endpoint="/api/students/count" />
            <StatsCard title="Active Students" endpoint="/api/students/count?status=Active" />
            <StatsCard title="Graduated Students" endpoint="/api/students/count?status=Graduated" />
          </Suspense>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Records</h2>
            <Link
              href="/admin/students/new"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Student
            </Link>
          </div>
          <Suspense fallback={<div>Loading students...</div>}>
            <StudentTable />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  );
}