"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "../../lib/api/user";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Student Management</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Profile
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin/students"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    Students
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin/students"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Students
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-5">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}