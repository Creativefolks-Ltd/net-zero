import React from "react";
import Auth from "../../components/pages/auth/Auth";
import Image from "next/image";

export default function Login() {
  return (
    <main className="relative">
      <div className="pt-12 md:pt-16 md:pb-32 container">
        <Auth />
      </div>
      <div className="mt-16 md:absolute right-0 top-[70px]">
        <figure className="relative w-full h-[200px] md:h-[380px] lg:h-[600px] aspect-square">
          <Image
            src={"/images/Login - pexels-cameron-casey-1157255.jpg"}
            fill
            alt="Login"
            className="object-cover md:object-contain"
          />
        </figure>
      </div>
    </main>
  );
}
