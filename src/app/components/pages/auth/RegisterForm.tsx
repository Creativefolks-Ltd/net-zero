import React from "react";
import { Heading } from "../../core/Heading";
import Input from "../../core/Input";
import Button from "../../core/Button";

export default function RegisterForm() {
  return (
    <form className="md:w-1/2 lg:w-1/4 text-start">
      <Heading
        level={1}
        withUnderline
        className="text-3xl text-brand-dark pb-4 mb-4 mt-10"
      >
        Welcome
      </Heading>
      <span>Register to continue</span>
      <Input placeholder="Email address" className="mb-5 mt-12" />
      <Input placeholder="Password" type="password" className="" />
      <div className="flex flex-col items-center mt-12">
        <Button className="min-w-[150px] mt-4 text-center">Register</Button>
      </div>
    </form>
  );
}
