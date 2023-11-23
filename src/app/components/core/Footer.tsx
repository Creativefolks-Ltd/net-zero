import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  const footerLinks = ["Privacy", "Terms", "Cookies"];
  return (
    <footer className="bg-brand-dark text-white pt-32 lg:pt-12 pb-8">
      <div className="container">
        <div className="flex relative items-start justify-between px-8">
          <div className=" h-24 md:h-44 w-40 relative mb-8">
            <Image
              src="/images/net_zero_logo.png"
              alt="Net Zero logo"
              fill
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col md:hidden gap-3">
            {footerLinks.map((item) => (
              <Link key={item} href="/" className="text-right pr-4 py-0 ">
                {item}
              </Link>
            ))}
          </div>
          <div className="absolute -top-48 lg:-top-24 right-5 md:right-10 bg-brand w-[300px] text-center text-white font-bold rounded-xl p-8 z-50">
            <p className="mb-4 text-3xl text-white">Any Questions?</p>
            <p className="mb-0 text-xl text-white">
              Please contact
              <a
                className="block text-dark"
                href="mailto:netzero@good.business"
              >
                netzero@good.business
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-brand py-2 px-8 lg:px-5 flex items-center justify-between">
          <div className="w-full md:w-auto flex justify-center md:justify-start flex-col md:flex-row text-sm text-center md:text-left">
            <span className="my-3 md:my-0">© {date} Net Zero All Rights</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span>Website Design by CREATIVEFOLKS</span>
          </div>
          <div className="md:flex items-center hidden">
            {footerLinks.map((item) => (
              <Link
                key={item}
                href="/"
                className="leading-[1] mr-4 last-of-type:mr-0 pr-4 last-of-type:pr-0 py-0 text-sm border-r last-of-type:border-0"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
