import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "./AppLayout";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play Ground - Board Game",
  description: "A strategic asymmetric game where Outcasts must escape the playground while a Warden hunts them",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>
          {children}
          <Analytics/>
        </AppLayout>
      </body>
    </html>
  );
}