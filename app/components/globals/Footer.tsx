"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Overlock } from "next/font/google";
import FooterLinks from "./FooterLinks";
import FooterSocialMedia from "./FooterSocialMedia";
import FooterCopyRight from "./FooterCopyRight";
const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Footer() {
  const pathname = usePathname();
  const auth =
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/reset-password";
  if (auth) {
    return null;
  }
  return (
    <footer className=" bg-black text-white py-16 px-2 mt-auto">
      <div className=" container mx-auto flex gap-4 md:gap-0 flex-col md:flex-row md:justify-between md:items-center">
        <div className=" text-[#33A077] flex items-center justify-center md:justify-start mx-auto md:mx-0 w-full">
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
        <div
          className=" flex flex-col md:flex-row justify-between
        gap-8 md:gap-0 w-full"
        >
          <FooterLinks />
          <div className="w-full">
            <FooterSocialMedia />
            <FooterCopyRight />
          </div>
        </div>
      </div>
    </footer>
  );
}
