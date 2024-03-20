import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";
import { ThemeButton } from "../theme/ThemeButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { CodeInput } from "../code/CodeInputComponent";
import { Toast } from "@radix-ui/react-toast";
import { userInfo } from "os";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropDown from "./userDropDown";

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
  setStdin: Function;
  submitButtonClicked: Boolean;
}
const Navbar: React.FC<NavbarProps> = ({
  user,
  setSubmitButtonClicked,
  submitButtonClicked,
  setStdin,
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
    <nav className="py-5 h-fit z-[1000] ">
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
              {/* <div className="flex justify-center items-center"> */}
              <UserDropDown name={name} />
              {/* </div> */}
            </>
          ) : null}
          <div>
            <ThemeButton />
          </div>
          {name && language ? (
            <CodeInput
              setStdin={setStdin}
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
