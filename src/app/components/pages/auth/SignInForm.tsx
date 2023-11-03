import React from "react";
import Input from "../../core/Input";
import { Heading } from "../../core/Heading";
import Button from "../../core/Button";

export default function SignInForm() {
  return (
    <form className="w-1/4">
      <Heading
        level={1}
        withUnderline
        className="text-3xl text-brand-dark pb-4 mb-4 mt-10"
      >
        Welcome back
      </Heading>
      <span>Sign in to continue</span>
      <Input placeholder="Email address" className="mb-5 mt-12" />
      <Input placeholder="Password" type="password" className="" />
      <div className="flex flex-col items-center mt-12">
        <a href="/forgot-password">Forgot your password</a>
        <Button className="min-w-[150px] mt-4 text-center">Sign in</Button>
      </div>
    </form>
  );
}
