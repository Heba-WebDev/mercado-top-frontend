"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Overlock } from "next/font/google";
const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Footer() {
  const pathname = usePathname();
  const auth = pathname === "/signup" || pathname === "/signin";
  if (auth) {
    return null;
  }
  return (
    <footer className=" bg-black text-white py-4 px-2 mt-auto">
      <div className=" container mx-auto flex gap-4 md:gap-0 flex-col md:flex-row md:justify-between md:items-center">
        <div className=" text-[#33A077] mx-auto md:mx-0">
          <Link
            href="/"
            className={`${overlock.className} uppercase flex items-center mt-2`}
          >
            <Image
              src="/images/globals/logo.svg"
              alt="mercado top"
              width={25}
              height={50}
              style={{ width: "25px", height: "50px" }}
            />
            <span className=" font-black text-lg">MercadoTop</span>
          </Link>
        </div>
        <div className="text-[#666] text-center md:text-left">
          <span>All rights reserved © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
