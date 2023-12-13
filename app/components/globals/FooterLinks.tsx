import Link from "next/link";
export default function FooterLinks() {
  return (
    <div className="w-full grid justify-center md:justify-end">
      <p className="font-semibold text-center md:text-left text-[20px] pb-6">
        Links
      </p>
      <ul className="flex flex-col justify-center gap-6 text-gray-500">
        <li className=" text-center md:text-left">
          <Link href="/">Home</Link>
        </li>
        <li className=" text-center md:text-left">
          <Link href="/market">Market</Link>
        </li>
        <li className=" text-center md:text-left">
          <Link href="/#what-we-do">What We Do</Link>
        </li>
        <li className=" text-center md:text-left">
          <Link href="/#about-us">About Us</Link>
        </li>
      </ul>
    </div>
  );
}
