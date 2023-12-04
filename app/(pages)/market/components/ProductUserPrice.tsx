import Image from "next/image";
export interface details {
  user: string;
  date: string;
  country: string;
  price: string;
}

export default function ProductUserPrice({
  user,
  date,
  country,
  price,
}: details) {
  return (
    <div className="py-4 flex items-center justify-between w-full">
      <div className="w-full text-xs text-[#666] grid gap-2">
        <div className="flex items-center gap-1">
          <Image src="/images/market/user.svg" alt="" width={15} height={30} />
          <p>random_12</p>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/images/market/time.svg" alt="" width={15} height={30} />
          <p>2 Days ago</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pr-1">
        <div className="flex items-center justify-center gap-1 text-xs text-[#666] w-full">
          <Image
            src="/images/market/MapPin.svg"
            alt=""
            width={15}
            height={30}
          />
          <p>{country}</p>
        </div>
        <div className="flex items-center justify-start gap-1 text-sm text-[#666] w-full">
          <Image
            src="/images/market/price-tag.svg"
            alt=""
            width={15}
            height={30}
          />
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}
