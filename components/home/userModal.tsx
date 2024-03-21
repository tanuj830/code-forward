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
import axios from "axios";
import { userInfo } from "os";
import { SymbolIcon } from "@radix-ui/react-icons";

interface UserModalProps {
  setUserInfo: Function;
  setShowUserModel: Function;
  showUserModel: Boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  setUserInfo,
  setShowUserModel,
  showUserModel,
}) => {
  const [name, setName] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const name = window.localStorage.getItem("name");
    const language = window.localStorage.getItem("language");
    if (!name || !language) {
      setShowUserModel(true);
    } else {
      setShowUserModel(false);
    }
  }, [showUserModel]);

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (name.length > 0 && language.length > 0) {
      const result = { name: name, language: language };
      const lang = languages.find((lang) => lang.value === language);
      axios
        .post("https://code-forward-backend.onrender.com/user", result)
        .then((res) => {
          window.localStorage.setItem("name", result.name);
          window.localStorage.setItem("language", result.language);
          if (lang) {
            window.localStorage.setItem("languageID", JSON.stringify(lang.id));
            window.localStorage.setItem("syntax", lang?.syntax);
            window.localStorage.setItem("userID", res.data._id); //user mongodb id
          }

          // setUserInfo(res.data);
          setLoading(false);
          setShowUserModel(false);
        });
    } else {
      setError("Fill all credentials");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };
  return (
    <Card className="w-[380px] -translate-y-[15%] ">
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
          <Button className="flex gap-2 items-center">
            {loading === true ? (
              <span className="animate-spin">
                <SymbolIcon />
              </span>
            ) : null}
            <span>Submit</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UserModal;
