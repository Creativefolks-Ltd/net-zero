import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  const footerLinks = ["Privacy Policy", "Terms", "Cookies"];
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-8">
      <div className="container">
        <div className="flex items-start justify-between">
          <div className="h-44 w-40 relative mb-8">
            <Image src="/images/net_zero_logo.png" alt="Net Zero logo" fill className="object-contain w-full h-full" />
          </div>
          <div className="bg-brand w-96 text-center text-white font-bold rounded-xl p-8 mr-16 -mt-24">
            <p className="mb-4 text-3xl text-white">Any Questions?</p>
            <p className="mb-0 text-xl text-white">
              Please contact
              <a className="block text-dark" href="mailto:netzero@good.business">
                netzero@good.business
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-brand py-2 flex items-center justify-between">
          <span className="text-sm">© {date} Net Zero All Rights | Website Design by CREATIVEFOLKS</span>
          <div className="flex items-center">
            {footerLinks.map((item) => (
              <Link key={item} href="/" className="leading-[1] mr-4 last-of-type:mr-0 pr-4 last-of-type:pr-0 py-0 text-sm border-r last-of-type:border-0">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
