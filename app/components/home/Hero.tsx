import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="container mx-auto py-14
    justify-between gap-4 px-2"
    >
      <div className=" relative z-10 justify-center gap-3">
        <h1 className="text-center text-[#33A077] text-4xl md:text-6xl lg:text-6xl font-bold pb-3">
          Do not throw it, sell it!
        </h1>
        <div className="w-full pb-6">
          <p className=" text-[16px] mx-auto text-[#666] max-w-[750px]">
            We empower individuals to transform their unused items into
            opportunities, fostering a community that values mindful
            consumption. At Mercado Top, every transaction is a step towards a
            more sustainable future. Together, we can make a difference for our
            planet, one item at a time.
          </p>
        </div>
        <div className="flex items-center">
          <Link
            href="/market"
            className="mx-auto bg-[#33A077] hover:bg-[#227356] text-white font-semibold py-4
        px-8 rounded-lg"
          >
            Go to market
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end pt-14">
        <Image
          src="/images/home/hero-img.webp"
          width={1000}
          height={300}
          priority
          style={{ height: "auto" }}
          className="mx-auto"
          alt="woman in her home with a laptop"
        />
      </div>
    </section>
  );
}
