import Link from "next/link";
import { ToastContainer } from "react-toastify";
import SignInForm from "./components/Form";

export default function SignIn() {
  return (
    <main className="container mx-auto py-14 px-2 grid gap-6">
      <div className="grid max-w-[750px] mx-auto gap-6">
        <div className="flex flex-col gap-2">
          <h1 className=" text-3xl font-semibold">Sign in to your account</h1>
          <p className="test-base text-[#666]">
            Welcome back to MercadoTop, Let’s get you signed in!
          </p>
        </div>
        <div>
          <SignInForm />
        </div>
      </div>
      <Link href="/signup" className="text-green-700 text-center underline">
        Do not have an account? Sign up
      </Link>
    </main>
  );
}
