"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "student" | "admin";
  course: string;
  profileImage: File | null;
};

export default function RegisterForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
    course: "",
    profileImage: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Prepare form data
    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    formPayload.append('role', formData.role);
    
    if (formData.phone) formPayload.append('phone', formData.phone);
    if (formData.role === 'student') {
      formPayload.append('course', formData.course);
      formPayload.append('enrollmentYear', formData.enrollmentYear);
    }
    if (formData.profileImage) {
      formPayload.append('profileImage', formData.profileImage);
    }

    // Send request
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      body: formPayload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Redirect on success
    router.push('/auth/login?registered=true');
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Registration failed';
    setError(errorMessage);
    console.error('Registration error:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="mt-8 space-y-6 text-black" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Profile Image Upload */}
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={previewUrl}
              alt="Profile preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-cyan-600 underline text-sm"
          disabled={loading}
        >
          Upload Profile Picture
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            disabled={loading}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            disabled={loading}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            disabled={loading}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Register As *
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            required
            disabled={loading}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {formData.role === "student" && (
          <div className="sm:col-span-2">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              Course of Study *
            </label>
            <input
              id="course"
              name="course"
              type="text"
              required={formData.role === "student"}
              value={formData.course}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border p-2"
              disabled={loading}
            />
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            minLength={6}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            minLength={6}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
}