import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Mobile Only | Tour",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="mx-auto my-0 min-h-full max-w-screen-md">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
