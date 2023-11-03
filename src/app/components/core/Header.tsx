import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header({ isInBanner }: { isInBanner?: boolean }) {
  if (isInBanner) {
    return (
      <header className="absolute top-0 left-0 right-0 bg-transparent text-white">
        <div className="container flex items-center justify-between py-8">
          <figure className="relative w-40 h-32 shrink-0">
            <Image src="/images/net_zero_logo.png" alt="Net Zero logo" fill className="object-contain w-full h-full" />
          </figure>
          <div className="flex items-center">
            <FaRegUser className="text-3xl" />
            <GiHamburgerMenu className="ml-8 text-4xl" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white pt-4 pb-2 shadow-lg">
      <div className="container flex items-center justify-between">
        <figure className="relative w-40 h-24 shrink-0">
          <Image src="/images/net_zero_logo_black.png" alt="Net Zero logo" fill className="object-contain w-full h-full" />
        </figure>
        <div className="flex items-center">
          <FaRegUser className="text-3xl" />
          <GiHamburgerMenu className="ml-8 text-4xl" />
        </div>
      </div>
    </header>
  );
}
