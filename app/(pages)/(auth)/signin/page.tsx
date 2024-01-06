import Link from "next/link";
import OauthSignup from "./components/Oauth";
import SignInImage from "./components/SignInImage";
import Logo from "../signup/components/Logo";
import OauthSignin from "./components/Oauth";
import SignInForm from "./components/Form";

export default function SignUp() {
  return (
    <main className="grid lg:grid-cols-2 gap-4">
      <SignInImage />
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
        <OauthSignin />
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-1/2 lg:w-full bg-gray-600 opacity-5"></div>
          <p className="w-full text-sm text-gray-400 font-bold text-center">
            or Sign in with Email
          </p>
          <div className="h-[1px] w-1/2 lg:w-full bg-gray-600 opacity-5"></div>
        </div>
        <SignInForm />
        <Link href="/signup" className="text-[#33A077] text-center underline">
          Do not have an account? Sign up
        </Link>
      </section>
    </main>
  );
}
