import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import VisitTracker from "@/components/VisitTracker";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puskesmas Banjarangkan",
  description: "Sistem Informasi Vaksinasi Puskesmas Banjarangkan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <VisitTracker />
          <Toaster position="top-center" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
