import { useAppDispatch } from "@/app/hooks/store";
import { removeUser } from "@/app/store/users/slice";
import Image from "next/image";
export default function UserDropDown() {
  const disptach = useAppDispatch();
  return (
    <div
      className=" absolute z-50 bg-white shadow-md rounded-lg w-52 right-1 top-10 border
     border-gray-50 py-8 px-2 grid gap-4 justify-center"
    >
      <div className=" flex items-center gap-2 px-2 justify-between">
        <Image
          src="/images/globals/user.svg"
          alt="account"
          width={30}
          height={10}
          style={{ height: "auto" }}
        />
        <p>Account</p>
      </div>
      <div className=" flex items-center gap-2 px-2 justify-between">
        <Image
          src="/images/globals/settings.svg"
          alt="settings"
          width={30}
          height={10}
          style={{ height: "auto" }}
        />
        <p>Settings</p>
      </div>
      <div className=" flex items-center gap-2 px-2 justify-between text-red-400">
        <Image
          src="/images/globals/logout.svg"
          alt="account"
          width={30}
          height={10}
          style={{ height: "auto" }}
        />
        <button onClick={() => disptach(removeUser({}))}>Log-out</button>
      </div>
    </div>
  );
}
