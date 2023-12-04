import Image from "next/image";
import Link from "next/link";
export default function AddAProduct() {
  return (
    <div className="relative max-h-[450px] overflow-hidden xl:mx-auto xl:container">
      <div className=" absolute top-[37%] w-full flex items-center justify-center">
        <h1 className=" text-3xl md:text-5xl shadow-black xl:text-5xl text-white font-bold  text-center max-w-[20ch] ">
          You no longer need it?
          <Link href="" className=" text-[#33A077] underline px-2 relative">
            Sell
            <Image
              src="/images/market/arrow-up.svg"
              alt="click on sell"
              width={30}
              height={10}
              className=" absolute top-10 md:top-16 left-5 md:left-8 bg-white rounded-full"
            />
          </Link>
          it on MercadoTop{" "}
        </h1>
      </div>

      <Image
        src="/images/market/photo-boards.jpg"
        alt=""
        width={2270}
        height={100}
        style={{ width: "auto", height: "auto", objectFit: "contain" }}
        className=""
      />
    </div>
  );
}
