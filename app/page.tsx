"use client";
import React from "react";
import CodePlayground from "@/components/code/CodePlayground";
import Navbar from "@/components/home/Navbar";
import UserModal from "@/components/home/userModal";
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
  const [userInfo, setUserInfo] = React.useState({} as User);
  const [showUserModel, setShowUserModel] = React.useState(true);
  const [submitButtonClicked, setSubmitButtonClicked] = React.useState(false);
  const [stdin, setStdin] = React.useState("");
  return (
    <main className=" h-full w-full">
      <Navbar
        setStdin={setStdin}
        user={userInfo}
        submitButtonClicked={submitButtonClicked}
        setSubmitButtonClicked={setSubmitButtonClicked}
      />
      {showUserModel === true ? (
        <div className="h-full w-full flex justify-center items-center ">
          <UserModal
            setUserInfo={setUserInfo}
            setShowUserModel={setShowUserModel}
            showUserModel={showUserModel}
          />
        </div>
      ) : (
        <div className="">
          <CodePlayground
            stdin={stdin}
            setUserInfo={setUserInfo}
            setSubmitButtonClicked={setSubmitButtonClicked}
            submitButtonClicked={submitButtonClicked}
          />
        </div>
      )}
    </main>
  );
}
