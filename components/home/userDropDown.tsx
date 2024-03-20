import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

interface UserDropDownProps {
  name: string;
}
const UserDropDown = ({ name }: UserDropDownProps) => {
  const [userid, setUserid] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.localStorage.getItem("userID");
      setUserid(id || "");
    }
  }, []);
  const deleteUser = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  };
  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src="https://github.com/shadcn.png"
            className="h-8 w-8 rounded-full"
            alt=""
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel>
            👋Hey, <span className="capitalize">{name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-muted">
            <Link href={`/user/${userid}`}>Profile</Link>
          </DropdownMenuItem>
          {/* Deleting user will not delete data from database(this will helps you in getting insights of user and if you want to delete data from database too you have to only fire one delete query to database) */}
          <DropdownMenuItem
            onClick={() => deleteUser}
            className="bg-destructive/15 hover:bg-destructive mt-2 hover:text-white"
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
