import Image from "next/image";

export default function SignInImage() {
  return (
    <section className=" bg-green-50 h-screen hidden lg:grid justify-center items-center">
      <div className="flex justify-center items-center max-w-2xl">
        <Image
          src="/images/globals/signin-img.svg"
          alt=""
          width={450}
          height={350}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
}
