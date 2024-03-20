"use client";
import UserTable from "@/components/user/UserTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type userinfo = {
  name: string;
  language: string;
  userSubmisson: [
    {
      sourceCode: string;
      Date: string;
      output: string;
    }
  ];
};

const page = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({} as userinfo);

  useEffect(() => {
    const _id = window.localStorage.getItem("userID");
    if (!_id) {
      router.push("/");
    } else {
      axios
        .get(`http://code-forward-backend.onrender.com/user/${_id}`)
        .then((res) => setUserInfo(res.data[0]));
    }
  }, []);
  return (
    <div>
      <UserTable userInfo={userInfo} />
    </div>
  );
};

export default page;
