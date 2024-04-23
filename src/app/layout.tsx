import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "LatteFit",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="flex justify-center items-center" lang="kr">
      <body className="w-[360px] h-screen bg-gray02">
        {children}
      </body>
    </html>
  );
}
