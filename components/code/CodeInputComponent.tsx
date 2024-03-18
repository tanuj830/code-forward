import * as React from "react";
import { MinusIcon, PlayIcon, PlusIcon } from "@radix-ui/react-icons";
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

export function CodeInput() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Input</Button> */}
        <Button
        //   className="inline-block md:hidden"
        //   onClick={() => setSubmitButtonClicked(true)}
        >
          <PlayIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center  ">
        <div className=" w-full max-w-xl pt-5">
          <DrawerHeader className="">
            <div className="flex justify-between items-center">
              <div className="text-start">
                <DrawerTitle>Custom Input</DrawerTitle>
              </div>
              <Button
                className="flex gap-2 items-center"
                //   onClick={() => setSubmitButtonClicked(true)}
              >
                <PlayIcon /> <span> Submit Code</span>
              </Button>
            </div>
            <textarea
              name=""
              id=""
              className="bg-secondary w-full h-40 outline-none mt-5 rounded-lg p-1"
            ></textarea>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
