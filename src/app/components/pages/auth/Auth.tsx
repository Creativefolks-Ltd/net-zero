"use client";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function Auth() {
  const [signInTab, setSignInTab] = useState(true as boolean);

  return (
    <div className="md:bg-grey-lighter relative rounded-xl pt-12 pb-32 px-8 md:px-24">
      <div className="flex justify-center md:justify-start mb-3">
        <button
          className={`p-4 text-2xl relative text-grey-dark duration-300 transition-all font-bold   auth-tab  cursor-pointer ${
            signInTab && "auth-tab-selected"
          }`}
          onKeyDown={() => setSignInTab(true)}
          onClick={() => setSignInTab(true)}
        >
          Sign in
        </button>
        <button
          className={`p-4 text-2xl relative text-grey-dark duration-300 transition-all font-bold   auth-tab cursor-pointer ${
            !signInTab && "auth-tab-selected"
          }`}
          onKeyDown={() => setSignInTab(false)}
          onClick={() => setSignInTab(false)}
        >
          Register
        </button>
      </div>
      <div className="pl-5 text-center md:text-start">
        <span className="text-sm ">
          Admin port login{" "}
          <a href="/admin-login" className="underline">
            here
          </a>
        </span>
        {signInTab ? <SignInForm /> : <RegisterForm />}
      </div>
      <div className="hidden md:block absolute -right-40 top-[40px]">
        <figure className="relative w-full h-[600px] aspect-square">
          <Image
            src={"/images/Login - pexels-cameron-casey-1157255.jpg"}
            fill
            alt="Login"
            className="object-contain"
          />
        </figure>
      </div>
    </div>
  );
}
