"use client";
import { useState, useEffect } from "react";
import AccountSettings from "./components/AccountSettings";
import { useAppSelector } from "@/app/hooks/store";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/globals/Spinner";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.users);
  const router = useRouter();
  useEffect(() => {
    if (user.length === 0) {
      router.push("/market");
    }
    setLoading(false);
  }, [user, router]);

  return (
    <main className=" mx-auto container py-24 px-2">
      {loading && (
        <div className="mx-auto grid justify-center">
          <Spinner />
        </div>
      )}
      {!loading && user.length > 0 && (
        <>
          <AccountSettings />
          <div className=" max-w-[750px] mx-auto mt-8 p-2 rounded font-medium">
            <p className=" text-center">
              See our <span className=" text-[#33A077]">Terms of Service</span>{" "}
              and <span className=" text-[#33A077]">Privacy Policy</span>
            </p>
          </div>
        </>
      )}
    </main>
  );
}
