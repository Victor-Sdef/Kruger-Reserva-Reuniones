import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GradientLayout from "@/components/template/gradient-layout";
import { Toaster } from "@/components/atoms/sonnet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KEvaluación - Sistema de Reservas",
  description: "Sistema de gestión de reservas de salas de reuniones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <GradientLayout>{children}</GradientLayout>
        <Toaster />
      </body>
    </html>
  );
}
