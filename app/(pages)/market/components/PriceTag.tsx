import Image from "next/image";
export interface Price {
  price: string;
}
export default function PriceTag({ price }: Price) {
  return (
    <div
      className="absolute top-2 right-[-2%] bg-green-600 text-white w-20 p-1
      flex items-center justify-center gap-1 shadow-sm"
    >
      <p className="">{price}</p>
      <div className="mt-1">
        <Image
          src="/images/market/price-tags.svg"
          alt="price"
          width={15}
          height={20}
        />
      </div>
    </div>
  );
}
