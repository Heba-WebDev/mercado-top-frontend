import Image from "next/image";
export interface details {
  user: string;
  posted_at: string;
  country: string;
  price: string;
}

export default function ProductUserPrice({
  user,
  posted_at,
  country,
}: details) {
  return (
    <div className="py-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-1 text-xs text-[#666] w-full">
        <Image
          src="/images/market/user.svg"
          alt=""
          width={15}
          height={30}
          style={{ width: "auto" }}
        />
        <p>
          Sold By: <span className=" text-sm font-semibold">{user}</span>
        </p>
      </div>
      {/* <div className="flex items-center justify-center gap-1 text-xs text-[#666] w-full">
        <Image src="/images/market/time.svg" alt="" width={15} height={30} />
        <p>{posted_at}</p>
      </div> */}
      <div className="flex items-center justify-end gap-1 text-xs text-[#666] w-full">
        <Image
          src="/images/market/MapPin.svg"
          alt=""
          width={15}
          height={30}
          style={{ width: "auto" }}
        />
        <p>
          Location: <span className=" text-sm font-semibold">{country}</span>
        </p>
      </div>
    </div>
  );
}
