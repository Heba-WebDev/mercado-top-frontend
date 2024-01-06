import Image from "next/image";

export default function OauthSignin() {
  return (
    <section
      className={`flex items-center gap-4 border
      mt-6 mb-4 py-3 justify-center rounded-lg border-opacity-25`}
    >
      <Image
        src="/images/globals/GoogleIcon.svg"
        alt="mercado top"
        width={30}
        height={30}
        style={{ width: "25px", height: "25px" }}
      />
      <p className="font-bold">Sign in with Google</p>
    </section>
  );
}
