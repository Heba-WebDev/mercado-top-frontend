import Image from "next/image";

export default function SignUpImage() {
  return (
    <section className=" bg-green-50 hidden max-h-[70%] md:grid justify-center items-center">
      <div className="flex max-w-2xl ">
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
