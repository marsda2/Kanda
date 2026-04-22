import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-32 flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
