import Image from "next/image";

export default function SignUpImage() {
  return (
    <section className=" bg-green-50 hidden md:flex justify-center ">
      <div className="flex max-w-2xl max-h-[70%]">
        <Image
          src="/images/globals/signup-img.svg"
          alt=""
          width={450}
          height={350}
        />
      </div>
    </section>
  );
}
