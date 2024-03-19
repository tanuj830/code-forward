"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import axios from "axios";
import { languages } from "@/constants/languages";
import { encode, decode } from "js-base64";

interface CodePlayProps {
  user: {
    id: number;
    name: string;
    language: string;
    syntax: string;
  };
  submitButtonClicked: Boolean;
  setSubmitButtonClicked: Function;
}

const CodePlayground: React.FC<CodePlayProps> = ({
  user,
  submitButtonClicked,
  setSubmitButtonClicked,
}) => {
  // finding default syntax of user's prefered language
  const defaultSyntax = languages.find((lang) => lang.value === user.language);

  const getTheme = useTheme();
  const [code, setCode] = useState(defaultSyntax?.syntax);
  // const [output, setOutput] = useState({} as any);

  const handleCode = (value: any, event: any) => {
    setCode(value);
  };

  if (submitButtonClicked === true && defaultSyntax) {
    setSubmitButtonClicked(false);
    console.log(code);
    // const options = {
    //   method: "POST",
    //   url: "https://judge0-ce.p.rapidapi.com/submissions",
    //   params: {
    //     base64_encoded: "true",
    //   },
    //   headers: {
    //     "content-type": "application/json",
    //     "Content-Type": "application/json",
    //     "X-RapidAPI-Key": "b8fbf23572msh5937faec3ef7c60p1d7c92jsnfb7c9fddb975",
    //     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    //   },
    //   data: {
    //     language_id: defaultSyntax.id,
    //     source_code: btoa(code || defaultSyntax.syntax),
    //   },
    // };
    // axios.request(options).then((res) => {
    //   // console.log(res.data.token);
    //   if (res.data.token) {
    //     const options = {
    //       method: "GET",
    //       url: `https://judge0-ce.p.rapidapi.com/submissions/$  {res.data.token}`,
    //       params: {
    //         base64_encoded: "true",
    //       },
    //       headers: {
    //         "X-RapidAPI-Key":
    //           "b8fbf23572msh5937faec3ef7c60p1d7c92jsnfb7c9fddb975",
    //         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    //       },
    //     };
    //     axios.request(options).then((res) => setOutput(res.data));
    //   }
    // });
  }
  return (
    <div className="bg-secondary h-[80vh] mt-5 rounded-lg overflow-hidden ">
      <Editor
        theme={getTheme.theme === "dark" ? "vs-dark" : "light"}
        className={`${getTheme.theme === "light" ? "border" : ""}`}
        height="80vh"
        language={user.language}
        onChange={handleCode}
        defaultValue={
          "// You can write your " +
          user.language +
          " code \n" +
          defaultSyntax?.syntax
        }
        // defaultValue={user.syntax}
      />
    </div>
  );
};

export default CodePlayground;
