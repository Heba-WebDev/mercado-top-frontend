"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Overlock } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/store";
import { IMAGE_URL } from "@/app/utils/ImageBaseURL";
import UserDropDown from "./UserDropDown";
const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function NavbarMobile() {
  const [hasMounted, setHasMounted] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);
  const user = useAppSelector((state) => state.users);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };
  const pathname = usePathname();
  const auth =
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/reset-password";
  const handleUserDropDown = () => {
    setOpenUserDropDown(!openUserDropDown);
  };
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (auth) {
    return (
      <nav className="relative md:hidden flex items-center justify-between container mx-auto py-4 px-2">
        <Link
          href="/"
          className={`${overlock.className} uppercase flex items-center`}
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
      </nav>
    );
  }
  return (
    <nav className="relative md:hidden flex items-center justify-between container mx-auto py-4 px-2">
      <div className=" flex flex-row-reverse items-center gap-1">
        <Link
          href="/"
          className={`${overlock.className} uppercase flex items-center`}
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

        <button onClick={handleClick}>
          {!isNavOpen && (
            <Image
              src="/images/globals/menu-burger.svg"
              alt="open"
              width={25}
              height={10}
              style={{ width: "18px", height: "auto" }}
            />
          )}
          {isNavOpen && (
            <Image
              src="/images/globals/x.svg"
              alt="open"
              width={25}
              height={10}
              style={{ width: "18px", height: "auto" }}
            />
          )}
        </button>
      </div>
      {hasMounted && user.length !== 0 && (
        <div className="relative">
          <button onClick={handleUserDropDown}>
            <Image
              src={`${IMAGE_URL}${user[0].profile_picture}`}
              alt=""
              width={30}
              height={10}
              style={{ height: "auto" }}
              className=" rounded-full"
            />
          </button>
          {openUserDropDown && <UserDropDown />}
        </div>
      )}

      <div
        className={`${
          isNavOpen ? "block z-40 bg-white" : "hidden"
        } absolute top-16 w-[96.5%] py-8 shadow-xl rounded-lg border border-gray-50`}
      >
        <ul className="flex flex-col items-center gap-8">
          <Link href="/market" className="">
            <li
              className="border-4
          border-x-0 border-t-0 border-b-white hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              Market
            </li>
          </Link>
          <Link href="/#what-we-do">
            <li
              className="border-4
          border-x-0 border-t-0 border-b-white hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              What We Do
            </li>
          </Link>
          <Link href="/#about-us">
            <li
              className="border-4
          border-x-0 border-t-0 border-b-white hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              About Us
            </li>
          </Link>
        </ul>
        {hasMounted && user.length == 0 && (
          <div className="flex justify-center py-6 bg-[#33A077] max-w-[180px] max-h-4 gird items-center rounded-md mx-auto mt-6">
            <Link href="/signup" className="text-white text-center">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
