"use client";

import { useEffect, useState } from "react";

export default function StatsCard({ title, endpoint }: { title: string; endpoint: string }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading stats");
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
  }, [endpoint]);

  if (loading) return <div className="p-4 bg-gray-100 rounded-lg animate-pulse h-24" />;
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{count}</p>
    </div>
  );
}