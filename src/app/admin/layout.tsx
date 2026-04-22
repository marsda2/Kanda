import React from "react";
import type { Metadata } from "next";
import "../../index.css";

export const metadata: Metadata = {
  title: "Kanda Admin",
  description: "Panel de administración de Kanda",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body">
      {children}
    </div>
  );
}
