import React from "react";
import Auth from "../components/pages/auth/Auth";
import Header from "../components/core/Header";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-16 pb-32 container">
          <Auth />
        </div>
      </main>
    </>
  );
}
