import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import axios from "axios";
interface CodePlayProps {
  submitButtonClicked: Boolean;
  setSubmitButtonClicked: Function;
  setUserInfo: Function;
  stdin: string;
}

const CodePlayground: React.FC<CodePlayProps> = ({
  stdin,
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
        "X-RapidAPI-Key": "2e7ddf0191msh56605198be37274p168095jsn572ac47f2b3a",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: languageID,
        source_code: btoa(code),
        stdin: btoa(stdin),
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
              "2e7ddf0191msh56605198be37274p168095jsn572ac47f2b3a",
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
                input: stdin,
                output:
                  res.data.stdout != null ? res.data.stdout : res.data.stderr,
                Date: Date.now(),
              }
            )
            .then((res) => {
              console.log(res.data);
              setSubmitButtonClicked(false);
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
