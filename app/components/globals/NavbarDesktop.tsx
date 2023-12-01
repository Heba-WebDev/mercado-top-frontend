import { Overlock } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function NavbarDesktop() {
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
          <Link href="/products" className="">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-green-700"
            >
              Products
            </li>
          </Link>
          <Link href="">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-green-700"
            >
              How it works
            </li>
          </Link>
          <Link href="">
            <li
              className="hover:border-4
          hover:border-x-0 hover:border-t-0 hover:border-b-green-700"
            >
              About Us
            </li>
          </Link>
        </ul>
        <div className="">
          <Link
            href="/signup"
            className=" bg-green-700 hover:bg-green-600 px-8 py-3 text-lg
          rounded-lg text-white"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
