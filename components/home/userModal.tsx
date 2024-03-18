import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/languages";
import { Badge } from "../ui/badge";

interface UserModalProps {
  setUserInfo: Function;
}

const UserModal: React.FC<UserModalProps> = ({ setUserInfo }) => {
  const [name, setName] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.length > 0 && language.length > 0) {
      const result = { name: name, language: language };
      setUserInfo(result);
    } else {
      setError("Fill all credentials");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };
  return (
    <Card className="w-[380px]  ">
      <CardHeader>
        <CardTitle>Code Forward</CardTitle>
        <CardDescription>
          Fill out this form to use this platform.
          {error.length > 0 ? (
            <Badge variant={"destructive"} className="my-2">
              {error}
            </Badge>
          ) : null}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Language</Label>
              <Select onValueChange={(e) => setLanguage(e)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {languages.map((lang, index) => (
                    <SelectItem value={lang.value} key={index}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-end">
          <Button>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UserModal;
