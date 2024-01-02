import Link from "next/link";
import SignUpForm from "./components/Form";

export default function SignUp() {
  return (
    <main className="container mx-auto py-14 px-2 grid gap-6">
      <div className="grid max-w-[750px] mx-auto gap-6">
        <div className="flex flex-col gap-2">
          <h1 className=" text-3xl font-semibold">Create an account</h1>
          <p className="test-base text-[#666]">
            Welcome to MercadoTop, Let’s get you started!
          </p>
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
      <Link href="/signin" className="text-[#33A077] text-center underline">
        Already have an account? Sign in
      </Link>
    </main>
  );
}
