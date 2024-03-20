import * as React from "react";
import {
  CodeIcon,
  CodeSandboxLogoIcon,
  MinusIcon,
  PlayIcon,
  PlusIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "../ui/badge";
import axios from "axios";

interface CodeInputProps {
  setStdin: Function;
  setSubmitButtonClicked: Function;
  submitButtonClicked: Boolean;
  userInfo: {
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
  };
}

export function CodeInput({
  setSubmitButtonClicked,
  userInfo,
  setStdin,
  submitButtonClicked,
}: CodeInputProps) {
  const handleCodeSubmisson = () => {
    setSubmitButtonClicked(true);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <PlayIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="flex h-full justify-center items-center py-4">
          <div className=" w-full md:w-[70%] lg:w-[50%] xl:w-[40%] ">
            <DrawerHeader className="">
              <div className="flex justify-between items-center">
                <div className="text-start">
                  <DrawerTitle>Custom Input</DrawerTitle>
                </div>
                <Button
                  className="flex gap-2 items-center"
                  onClick={handleCodeSubmisson}
                >
                  {submitButtonClicked === true ? (
                    <span className="flex items-center gap-2">
                      <SymbolIcon
                        className="animate-spin"
                        height={16}
                        width={16}
                      />{" "}
                      <span> Submit Code</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 ">
                      <CodeIcon className="" height={20} width={20} />{" "}
                      <span> Submit Code</span>
                    </span>
                  )}
                </Button>
              </div>
              <span className="text-start text-xs text-muted-foreground mt-4">
                For now you can only submit your code. Submitting code will
                redirect you to your profile page.
              </span>
              <textarea
                onChange={(e) => setStdin(e.target.value)}
                name=""
                id=""
                className="bg-secondary w-full h-40 outline-none mt-1 rounded-lg p-1"
              ></textarea>
            </DrawerHeader>
            <DrawerFooter>
              <div className="h-full ">
                <div className="text-start h-full">
                  <div className="h-full">
                    <DrawerTitle>Output</DrawerTitle>
                    <div className="h-20 md:h-full bg-secondary mt-8 rounded-lg p-1 animate-pulse flex justify-center items-center ">
                      <small className="text-clip text-xs p-3">
                        You can't see the output of your code, Admin has
                        restricted this functionality
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
