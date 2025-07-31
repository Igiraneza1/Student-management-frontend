"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/api/user";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user || !allowedRoles.includes(user.role)) {
          router.push("/profile");
        } else {
          setIsAllowed(true);
        }
      } catch {
        router.push("/profile");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAllowed ? <>{children}</> : null;
}