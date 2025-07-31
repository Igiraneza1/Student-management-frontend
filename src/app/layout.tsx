import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/common/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Management System",
  description: "Manage students and courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="min-h-screen bg-gray-100">{children}</main>
      </body>
    </html>
  );
}