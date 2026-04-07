import React from "react";
import type { Metadata } from "next";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Kanda - La Pausa Perfecta",
  description: "Disfruta de la mejor experiencia de Matcha, Café y Panadería en el Vedado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#f9f9f9] text-[#1a1c1c] font-body min-h-screen flex flex-col">
          <Header />
          <main className="pt-32 flex-grow">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
