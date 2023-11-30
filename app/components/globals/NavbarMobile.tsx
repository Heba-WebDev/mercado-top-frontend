"use client";
import Image from "next/image";
import { useState } from "react";
import { Overlock } from "next/font/google";
const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function NavbarMobile() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="relative md:hidden flex items-center justify-between container mx-auto py-4 px-2">
      <div className={`${overlock.className} uppercase flex items-center`}>
        <Image
          src="/images/globals/logo.svg"
          alt="mercado top"
          width={25}
          height={50}
          objectFit="cover"
        />
        <span className=" font-black text-lg">MercadoTop</span>
      </div>
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>
      <div
        className={`${
          isNavOpen ? "block z-40 bg-white" : "hidden"
        } absolute top-12 w-[96.5%] py-8 shadow-lg rounded-lg`}
      >
        <ul className="flex flex-col items-center gap-8">
          <li>Products</li>
          <li>How it works</li>
          <li>About Us</li>
        </ul>
        <div className="flex justify-center py-6">
          <button>Sign in</button>
        </div>
      </div>
    </nav>
  );
}
