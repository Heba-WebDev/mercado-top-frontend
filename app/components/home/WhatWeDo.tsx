import Link from "next/link";
export default function WhatWeDo() {
  return (
    <section className="py-14 px-2 container mx-auto grid gap-14">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="grid gap-2 bg-[#F0EDE8] p-4">
          <div className="">
            <h4 className="text-2xl font-semibold pb-1">
              Protecting the Planet
            </h4>
          </div>
          <div className="">
            <p className="flex-grow pb-3">
              At Mercado Top, we believe in giving items a second life. By
              selling your unused items, you’re not just decluttering your
              space, but also reducing waste and contributing to a greener
              planet. Every item sold is one less item in a landfill. Together,
              we can make a difference.
            </p>
          </div>
          <div className="mt-auto flex justify-end">
            <Link href="" className="">
              Learn more &gt;
            </Link>
          </div>
        </div>
        <div className="grid gap-2 bg-[#F0EDE8] p-4">
          <div className="">
            <h4 className=" text-2xl font-semibold pb-1">
              Empowering Communities
            </h4>
          </div>
          <div className="">
            <p className=" pb-3">
              We’re more than just a marketplace. We’re a community that values
              sustainability and empowerment. By selling on Mercado Top, you’re
              turning your unused items into opportunities and helping to create
              a circular economy where everyone benefits.
            </p>
          </div>
          <div className="flex justify-end">
            <Link href="" className="">
              Learn more &gt;
            </Link>
          </div>
        </div>
        <div className="grid gap-2 bg-[#F0EDE8] p-4">
          <div className="">
            <h4 className=" text-2xl font-semibold pb-1">
              Help You Make Money
            </h4>
          </div>
          <div className="">
            <p className=" pb-3">
              Don’t let your unused items gather dust. Turn them into cash on
              Mercado Top! It’s easy to list your items and start making money.
              Plus, you’ll be doing your part to promote sustainable
              consumption. It’s a win-win!
            </p>
          </div>
          <div className="flex justify-end">
            <Link href="" className="">
              Learn more &gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
