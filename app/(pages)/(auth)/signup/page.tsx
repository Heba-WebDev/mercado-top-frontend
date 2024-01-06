import Link from "next/link";
import SignUpForm from "./components/Form";
import Logo from "./components/Logo";
import OauthSignup from "./components/Oauth";
import SignUpImage from "./components/SignupImage";

export default function SignUp() {
  return (
    <main className="grid lg:grid-cols-2 gap-4">
      <SignUpImage />
      <section className="grid max-w-[750px] md:w-full mx-auto gap-6 py-14 px-2">
        <Logo />
        <div className="flex flex-col gap-1">
          <h1 className=" text-3xl font-semibold">
            Hi, Welcome to MercadoTop!
          </h1>
          <p className="test-base text-gray-400">
            Create an account and enjoy starting MercadoTop
          </p>
        </div>
        <OauthSignup />
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-1/2 lg:w-full bg-gray-600 opacity-5"></div>
          <p className="w-full text-sm text-gray-400 font-bold text-center">
            or Sign up with Email
          </p>
          <div className="h-[1px] w-1/2 lg:w-full bg-gray-600 opacity-5"></div>
        </div>
        <SignUpForm />
        <Link href="/signin" className="text-[#33A077] text-center underline">
          Already have an account? Sign in
        </Link>
      </section>
    </main>
  );
}
