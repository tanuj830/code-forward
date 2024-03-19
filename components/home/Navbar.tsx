import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";
import { ThemeButton } from "../theme/ThemeButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { CodeInput } from "../code/CodeInputComponent";
import { Toast } from "@radix-ui/react-toast";

interface NavbarProps {
  user: {
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
  setSubmitButtonClicked: Function;
  submitButtonClicked: Boolean;
}
const Navbar: React.FC<NavbarProps> = ({
  user,
  setSubmitButtonClicked,
  submitButtonClicked,
}) => {
  const [name, setName] = useState("" as any);
  const [language, setLanguage] = useState("" as any);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(window.localStorage.getItem("name"));
      setLanguage(window.localStorage.getItem("language"));
    }
  });

  return (
    <nav className="py-5 h-fit">
      <div className="flex justify-between items-center">
        <div>
          <Link className="font-bold text-md md:text-xl" href="/">
            Code <span className="text-primary">Forward</span>
          </Link>
        </div>
        <div className="flex items-center gap-1 md:gap-5">
          {name && language ? (
            <>
              <div>
                <Badge variant={"secondary"}>{language}</Badge>
              </div>
              <div>
                <Button variant={"secondary"} className="rounded-full p-3  ">
                  {name.slice(0, 2)}
                </Button>
              </div>
            </>
          ) : null}
          <div>
            <ThemeButton />
          </div>
          {/* {user.name && user.language ? (
            <>
              <Button
                className="inline-block md:hidden"
                onClick={() => setSubmitButtonClicked(true)}
              >
                <PlayIcon />
              </Button>
              <Button
                className="hidden md:inline-block"
                onClick={() => setSubmitButtonClicked(true)}
              >
                <PlayIcon />
              </Button>
            </>
          ) : null} */}
          {name && language ? (
            <CodeInput
              setSubmitButtonClicked={setSubmitButtonClicked}
              submitButtonClicked={submitButtonClicked}
              userInfo={user}
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
