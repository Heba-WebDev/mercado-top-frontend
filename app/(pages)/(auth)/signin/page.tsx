"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SignInForm from "./components/Form";
import { useAppSelector } from "@/app/hooks/store";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/globals/Spinner";

export default function SignIn() {
  const user = useAppSelector((state) => state.users);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.length !== 0) {
      router.push("/market");
    }
    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className=" grid justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="container mx-auto py-14 px-2 grid gap-6">
      {user.length === 0 && (
        <>
          <div className="grid max-w-[750px] mx-auto gap-6">
            <div className="flex flex-col gap-2">
              <h1 className=" text-3xl font-semibold">
                Sign in to your account
              </h1>
              <p className="test-base text-[#666]">
                Welcome back to MercadoTop, Let’s get you signed in!
              </p>
            </div>
            <div>
              <SignInForm />
            </div>
          </div>
          <Link href="/signup" className="text-[#33A077] text-center underline">
            Do not have an account? Sign up
          </Link>
        </>
      )}
    </main>
  );
}
