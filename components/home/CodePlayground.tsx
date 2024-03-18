import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import axios from "axios";

interface CodePlayProps {
  user: {
    name: string;
    language: string;
  };
  submitButtonClicked: Boolean;
}

const CodePlayground: React.FC<CodePlayProps> = ({
  user,
  submitButtonClicked,
}) => {
  const getTheme = useTheme();
  const [code, setCode] = useState("");

  const handleCode = (value: any, event: any) => {
    setCode(value);
  };
  // this will trigger whenever user click on submit code button
  // useEffect(() => {
  //   if (submitButtonClicked === true) {
  //     // check output using api

  //     const options = {
  //       method: "POST",
  //       url: "https://judge0-ce.p.rapidapi.com/submissions",
  //       params: {
  //         base64_encoded: "true",
  //         fields: "*",
  //       },
  //       headers: {
  //         "content-type": "application/json",
  //         "Content-Type": "application/json",
  //         "X-RapidAPI-Key":
  //           "b8fbf23572msh5937faec3ef7c60p1d7c92jsnfb7c9fddb975",
  //         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //       },
  //       data: {
  //         language_id: 52,
  //         source_code: code,
  //         stdin: "",
  //       },
  //     };
  //     axios.request(options).then((res) => {
  //       console.log(res.data.token);
  //       if (res.data.token) {
  //         const options = {
  //           method: "GET",
  //           url: `https://judge0-ce.p.rapidapi.com/submissions/${res.data.token}`,
  //           params: {
  //             base64_encoded: "true",
  //             fields: "*",
  //           },
  //           headers: {
  //             "X-RapidAPI-Key":
  //               "b8fbf23572msh5937faec3ef7c60p1d7c92jsnfb7c9fddb975",
  //             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //           },
  //         };
  //         axios.request(options).then((re) => console.log(re.data));
  //       }
  //     });
  //     // console.log(response.data.token);
  //   }
  // }, [submitButtonClicked]);

  return (
    <div className="bg-secondary h-[80vh] mt-5 rounded-lg overflow-hidden ">
      <Editor
        theme={getTheme.theme === "dark" ? "vs-dark" : "light"}
        className={`${getTheme.theme === "light" ? "border" : ""}`}
        height="80vh"
        language={user.language}
        onChange={handleCode}
        defaultValue={"// You can write your " + user.language + " code"}
      />
    </div>
  );
};

export default CodePlayground;
