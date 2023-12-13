import Link from "next/link";
import Image from "next/image";

export default function FooterSocialMedia() {
  return (
    <div className=" w-full flex flex-col">
      <p className="font-semibold text-[20px] pb-6 self-center md:self-end">
        Social Media
      </p>
      <div className="flex gap-6 text-gray-500 self-center md:self-end">
        <Image
          src="/images/globals/mdi_instagram.svg"
          alt="instagram"
          width={30}
          height={10}
          style={{ width: "20px", height: "auto" }}
        />
        <Image
          src="/images/globals/ic_baseline-facebook.svg"
          alt="facebook"
          width={30}
          height={10}
          style={{ width: "20px", height: "auto" }}
        />
        <Image
          src="/images/globals/mdi_twitter.svg"
          alt="x"
          width={30}
          height={10}
          style={{ width: "20px", height: "auto" }}
        />
        <Image
          src="/images/globals/mdi_instagram.svg"
          alt="instagram"
          width={30}
          height={10}
          style={{ width: "20px", height: "auto" }}
        />
      </div>
    </div>
  );
}
