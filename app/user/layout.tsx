"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/home/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState({} as any);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const stdin = () => {};
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-5 md:px-10 lg:px-20 xl:px-40  h-screen overflow-hidden">
          <Navbar
            user={userInfo}
            setStdin={stdin}
            submitButtonClicked={submitButtonClicked}
            setSubmitButtonClicked={setSubmitButtonClicked}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
