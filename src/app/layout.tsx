import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puskesmas Banjarangkan",
  description: "Sistem Informasi Vaksinasi Puskesmas Banjarangkan",
};

import VisitTracker from '@/components/VisitTracker'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VisitTracker />
        {children}
      </body>
    </html>
  )
}
