"use client";
import { useEffect, useState } from "react";
import { Overlock } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/store";
import { IMAGE_URL } from "@/app/utils/ImageBaseURL";
import UserDropDown from "./UserDropDown";

const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function NavbarDesktop() {
  const [hasMounted, setHasMounted] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);
  const user = useAppSelector((state) => state.users);
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
    return;
  }
  return (
    <nav className="hidden md:flex items-center justify-between container mx-auto pt-4 pb-8">
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
      <div className="flex items-center gap-5 mt-2">
        <ul className="flex items-center gap-6">
          <Link href="/market" className="">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              Market
            </li>
          </Link>
          <Link href="/#what-we-do">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              What We Do
            </li>
          </Link>
          <Link href="/#about-us">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-[#33A077]"
            >
              About Us
            </li>
          </Link>
        </ul>
        <div className="">
          {hasMounted && user.length === 0 && (
            <Link
              href="/signup"
              className=" bg-[#33A077] hover:bg-[#227356] px-8 py-3 text-lg
          rounded-lg text-white"
            >
              Sign up
            </Link>
          )}
          {hasMounted && user.length !== 0 && (
            <div className="relative">
              <button onClick={handleUserDropDown}>
                <Image
                  src={`${
                    user[0].profile_picture.startsWith("http") ||
                    user[0].profile_picture.startsWith("https")
                      ? user[0].profile_picture
                      : `${IMAGE_URL}${user[0].profile_picture}`
                  }`}
                  alt=""
                  width={30}
                  height={30}
                  objectFit="fill"
                  style={{ height: "30px", width: "30px" }}
                  className=" rounded-full object-fill"
                />
              </button>
              {openUserDropDown && (
                <UserDropDown handleUserDropDown={handleUserDropDown} />
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
