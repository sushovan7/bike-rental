import React from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import { Lock, Mail, Mars, User } from "lucide-react";

function Login() {
  return (
    <div className="flex w-screen  justify-center mt-30">
      <form
        className="shadow-lg sm:w-[55%] w-[80%] flex flex-col sm:gap-3 gap-5  items-center justify-center  px-5 py-10"
        action=""
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:w-[80%] w-full items-center justify-between ">
          <div className="flex flex-col">
            <Label htmlFor={"Firstname"}>Firstname:</Label>
            <Input
              type={"text"}
              placeholder={"Firstname"}
              id={"Firstname"}
              startIcon={<User size={15} />}
            />
          </div>
          <div className="flex flex-col ">
            <Label htmlFor={"Lastname"}>Lastname:</Label>
            <Input
              type={"text"}
              placeholder={"Lastname"}
              id={"Lastname"}
              startIcon={<User size={15} />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row w-full sm:w-[80%] items-center  justify-between ">
          <div className="flex flex-col items-start">
            <Label htmlFor={"Email"}>Email:</Label>
            <Input
              type={"email"}
              placeholder={"example@gmail.com"}
              id={"Email"}
              startIcon={<Mail size={15} />}
            />
          </div>
          <div className="flex flex-col ">
            <Label htmlFor={"Password"}>Password:</Label>
            <Input
              type={"password"}
              placeholder={"Password"}
              id={"Passworde"}
              startIcon={<Lock size={15} />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row w-full sm:w-[80%]  items-center justify-between ">
          <div className="flex  flex-col mt-4">
            <Label>Gender:</Label>
            <div className="flex items-center gap-3">
              <label>
                <input type="radio" name="gender" value="male" /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="other" /> Other
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor={"Age"}>Age:</Label>
            <Input
              type={"number"}
              placeholder={"Your age"}
              id={"Age"}
              startIcon={<Mars size={15} />}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <Label>Avatar</Label>
          <div className="avatar">
            <div className="w-20 rounded">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
