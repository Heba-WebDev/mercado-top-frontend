import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
export default function Logo() {
  return (
    <Link
      href="/"
      className={`${inter.className} flex items-center gap-2 pb-10`}
    >
      <Image
        src="/images/globals/logo.svg"
        alt="mercado top"
        width={30}
        height={30}
      />
      <p className=" text-2xl font-bold">MercadoTop</p>
    </Link>
  );
}
