import Image from "next/image";
export default function AboutUs() {
  return (
    <section className="container mx-auto py-14 px-2 grid gap-14 mb-10">
      <div className="">
        <Image
          src="/images/home/sustainability.jpg"
          alt=""
          width={1800}
          height={250}
        />
      </div>

      <div className=" text-lg text-[#666] flex flex-col gap-8">
        <div>
          <h2 className="  text-green-700  font-semibold text-3xl lg:text-4xl">
            About Us
          </h2>
        </div>
        <div className=" grid md:grid-cols-2 gap-4">
          <p className=" max-w-[650px]">
            At Mercado Top, we believe in the power of community and the
            importance of environmental sustainability. Our mission is to create
            a space where everyone can turn their waste into a source of income,
            thereby reducing waste and contributing to a healthier planet.
          </p>
          <p className=" max-w-[650px] justify-self-end">
            Our platform is more than just a second-hand market; it’s a movement
            towards conscious consumption and waste reduction. By giving a
            second life to items that would otherwise be discarded, we’re not
            only helping individuals earn extra income, but also making a
            positive impact on our environment.
          </p>
        </div>
      </div>
    </section>
  );
}
