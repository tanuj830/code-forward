"use client";

import CodePlayground from "@/components/home/CodePlayground";
import Navbar from "@/components/home/Navbar";
import UserModal from "@/components/home/userModal";
import { useEffect, useState } from "react";
import axios from "axios";
type User = {
  name: string;
  language: string;
};

export default function Home() {
  const [userInfo, setUserInfo] = useState({} as User);
  const [submitButtonClicked, setSubmitClicked] = useState(false);

  return (
    <main className=" h-full w-full">
      <Navbar user={userInfo} setSubmitButtonClicked={setSubmitClicked} />
      {userInfo.name ? (
        <div className="">
          {/* <Navbar user={userInfo} setSubmitButtonClicked={setSubmitClicked} /> */}
          <CodePlayground
            user={userInfo}
            submitButtonClicked={submitButtonClicked}
          />
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center -translate-y-[10%]">
          <UserModal setUserInfo={setUserInfo} />
        </div>
      )}
    </main>
  );
}
