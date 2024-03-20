"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import axios from "axios";
import { languages } from "@/constants/languages";
import { encode, decode } from "js-base64";
// import { userInfo } from "os";

interface CodePlayProps {
  // user: {
  //   id: number;
  //   _id: string;
  //   name: string;
  //   Date: string;
  //   language: string;
  //   userSubmisson: [
  //     {
  //       sourceCode: string;
  //       output: string;
  //       Date: string;
  //     }
  //   ];
  //   syntax: string;
  // };
  submitButtonClicked: Boolean;
  setSubmitButtonClicked: Function;
  setUserInfo: Function;
}

const CodePlayground: React.FC<CodePlayProps> = ({
  // user,
  setUserInfo,
  submitButtonClicked,
  setSubmitButtonClicked,
}) => {
  const getTheme = useTheme();

  const defaultSyntax = window.localStorage.getItem("syntax");
  const userID = window.localStorage.getItem("userID");
  const language = window.localStorage.getItem("language");
  const languageID = JSON.parse(
    window.localStorage.getItem("languageID") || ""
  );

  const [code, setCode] = useState(defaultSyntax);
  const [output, setOutput] = useState({} as any);

  const handleCode = (value: any, event: any) => {
    setCode(value);
  };
  //   output
  // "SGVsbG8gV29ybGQK
  // "

  if (submitButtonClicked === true && code) {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "bf0c75fb4amsh59e693748ea85b7p1271fajsn3b874788bc2e",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: languageID,
        source_code: btoa(code),
      },
    };
    axios.request(options).then((res) => {
      if (res.data.token) {
        const options = {
          method: "GET",
          url: `https://judge0-ce.p.rapidapi.com/submissions/${res.data.token}`,
          params: {
            base64_encoded: "true",
          },
          headers: {
            "X-RapidAPI-Key":
              "bf0c75fb4amsh59e693748ea85b7p1271fajsn3b874788bc2e",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        };
        axios.request(options).then((res) => {
          console.log(res.data);
          axios
            .put(
              `https://code-forward-backend.onrender.com/user/submit-code/${userID}`,
              {
                sourceCode: code,
                output:
                  res.data.stdout != null ? res.data.stdout : res.data.stderr,
                Date: Date.now(),
              }
            )
            .then((res) => {
              console.log(res.data);
              setSubmitButtonClicked(false);
              // console.log(output);
            });
        });
      }
    });
  }

  return (
    <div className="bg-secondary h-[80vh] mt-5 rounded-lg overflow-hidden ">
      <Editor
        theme={getTheme.theme === "dark" ? "vs-dark" : "light"}
        className={`${getTheme.theme === "light" ? "border" : ""}`}
        height="80vh"
        language={language || ""}
        onChange={handleCode}
        defaultValue={defaultSyntax || ""}
      />
    </div>
  );
};

export default CodePlayground;
