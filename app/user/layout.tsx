"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/home/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState({} as any);
  const [showUserModel, setShowUserModel] = useState(true);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-5 md:px-10 lg:px-20 xl:px-40  h-screen overflow-hidden">
          <Navbar
            user={userInfo}
            submitButtonClicked={submitButtonClicked}
            setSubmitButtonClicked={setSubmitButtonClicked}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
