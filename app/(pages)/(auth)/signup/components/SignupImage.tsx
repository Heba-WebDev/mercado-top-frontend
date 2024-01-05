import Image from "next/image";

export default function SignUpImage() {
  return (
    <section className=" bg-green-50 hidden h-full md:grid justify-center">
      <div className="flex justify-center items-center max-w-2xl max-h-[70%]">
        <Image
          src="/images/globals/signup-img.svg"
          alt=""
          width={450}
          height={350}
          style={{ width: "450px", height: "auto" }}
        />
      </div>
    </section>
  );
}
