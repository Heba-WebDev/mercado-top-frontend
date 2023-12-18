import Image from "next/image";
import Link from "next/link";
export default function FailureToFetchProducts() {
  return (
    <div className="pb-32 grid justify-center">
      <Image
        src="/images/market/no-products.svg"
        width={120}
        height={100}
        alt="something went wrong"
        style={{ width: "auto", height: "auto" }}
      />
      <h1 className="text-2xl md:text-5xl font-bold text-center py-8">
        Something went wrong
      </h1>
      <Link
        href="/"
        className=" bg-[#33A077] hover:bg-[#227356] py-3 px-1 text-white text-center rounded-lg
        w-full md:w-40 mx-auto"
      >
        Go back home
      </Link>
    </div>
  );
}
