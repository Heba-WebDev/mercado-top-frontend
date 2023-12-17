import Image from "next/image";
import Link from "next/link";
export default function AddAProduct() {
  return (
    <div className="relative container mx-auto py-24 text-center grid gap-4 justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          You no longer need it?
        </h1>
        <p>Sell any item you have at home on Mercado Top</p>
      </div>
      <Link
        href="market/sell"
        className=" bg-[#33A077] hover:bg-[#227356]
      py-3  px-1 text-white rounded-lg w-64 mx-auto uppercase font-medium"
      >
        Sell now
      </Link>
    </div>
  );
}
