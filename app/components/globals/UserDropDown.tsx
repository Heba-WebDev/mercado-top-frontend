"use client";
import { useAppDispatch } from "@/app/hooks/store";
import { removeUser } from "@/app/store/users/slice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserDropDown({
  handleUserDropDown,
}: {
  handleUserDropDown: () => void;
}) {
  const disptach = useAppDispatch();
  const router = useRouter();

  const handleSettingsClick = () => {
    router.push("/settings");
    handleUserDropDown();
  };

  return (
    <div
      className=" absolute z-50 bg-white shadow-md rounded-lg w-60 right-1 top-10 border
     border-gray-50 py-8 px-2 grid gap-4 justify-center"
    >
      <div className=" flex items-center gap-2 px-2 justify-between">
        <Image
          src="/images/globals/user.svg"
          alt="account"
          width={25}
          height={10}
          style={{ height: "auto" }}
        />
        <p>Account</p>
      </div>
      <button
        onClick={handleSettingsClick}
        className=" flex items-center gap-2 px-2 justify-between"
      >
        <Image
          src="/images/globals/settings.svg"
          alt="settings"
          width={25}
          height={10}
          style={{ height: "auto" }}
        />
        <p>Settings</p>
      </button>
      <div className="flex items-center gap-2 px-[10px] justify-between text-red-400">
        <Image
          src="/images/globals/logout.svg"
          alt="account"
          width={25}
          height={10}
          style={{ height: "auto" }}
        />
        <button onClick={() => disptach(removeUser({}))}>Log-out</button>
      </div>
    </div>
  );
}
