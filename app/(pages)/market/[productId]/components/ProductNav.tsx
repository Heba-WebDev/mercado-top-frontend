import Link from "next/link";

export default function ProductNav({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <nav className=" text-sm font-semibold">
      <ul className=" flex gap-2">
        <li className=" text-[#33A077]">
          <Link href="/">Home</Link>
        </li>
        <li className=" text-gray-400">&gt;</li>
        <li className=" text-[#33A077]">
          <Link href="/market">Market</Link>
        </li>
        <li className=" text-gray-400">&gt;</li>
        <li className=" text-[#33A077]">
          <Link href={`/market/${id}`}>
            {title?.length > 18 ? `${title?.slice(0, 15)}...` : title}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
