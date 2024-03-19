"use client";

import CodePlayground from "@/components/code/CodePlayground";
import Navbar from "@/components/home/Navbar";
import UserModal from "@/components/home/userModal";
import { useEffect, useState } from "react";
import axios from "axios";
type User = {
  languageId: number;
  _id: string;
  name: string;
  Date: string;
  language: string;
  userSubmisson: [
    {
      sourceCode: string;
      output: string;
      Date: string;
    }
  ];
  syntax: string;
};

export default function Home() {
  const [userInfo, setUserInfo] = useState({} as User);
  const [showUserModel, setShowUserModel] = useState(true);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  return (
    <main className=" h-full w-full">
      <Navbar
        user={userInfo}
        submitButtonClicked={submitButtonClicked}
        setSubmitButtonClicked={setSubmitButtonClicked}
      />
      {showUserModel === true ? (
        <div className="h-full w-full flex justify-center items-center -translate-y-[10%]">
          <UserModal
            setUserInfo={setUserInfo}
            setShowUserModel={setShowUserModel}
            showUserModel={showUserModel}
          />
        </div>
      ) : (
        <div className="">
          <CodePlayground
            // user={userInfo}
            setUserInfo={setUserInfo}
            setSubmitButtonClicked={setSubmitButtonClicked}
            submitButtonClicked={submitButtonClicked}
          />
        </div>
      )}
    </main>
  );
}
