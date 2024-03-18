import Link from "next/link";
import React from "react";
import { Combobox } from "../ui/combobox";
import { ThemeButton } from "../theme/ThemeButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { CodeInput } from "../code/CodeInputComponent";

interface NavbarProps {
  user: {
    name: string;
    language: string;
  };
  setSubmitButtonClicked: Function;
}
const Navbar: React.FC<NavbarProps> = ({ user, setSubmitButtonClicked }) => {
  return (
    <nav className="py-5 h-fit">
      <div className="flex justify-between items-center">
        <div>
          <Link className="font-bold text-md md:text-xl" href="/">
            Code <span className="text-primary">Forward</span>
          </Link>
        </div>
        <div className="flex items-center gap-1 md:gap-5">
          {user.name && user.language ? (
            <>
              <div>
                <Badge variant={"secondary"}>{user.language}</Badge>
              </div>
              <div>
                <Button variant={"secondary"} className="rounded-full p-3  ">
                  {user.name.slice(0, 2)}
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
          <CodeInput />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
