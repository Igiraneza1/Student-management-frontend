'use client'

import ProtectedRoute from '../../../components/common/protectedRoute';
import StudentTable from '../../../components/admin/studentTable';

export default function StudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Students Management</h1>
        <StudentTable />
      </div>
    </ProtectedRoute>
  );
}
