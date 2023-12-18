import Image from "next/image";
import Link from "next/link";
export default function AddAProduct() {
  return (
    <div className="py-2 text-center grid gap-4 justify-end mb-12">
      <Link
        href="market/sell"
        className=" bg-[#33A077] hover:bg-[#227356]
      py-3 px-1 rounded-lg w-60 flex items-center justify-center font-medium text-gray-100 gap-1"
      >
        <Image
          src="/images/market/add.svg"
          alt="add a product"
          width={120}
          height={20}
          style={{ width: "20px", height: "auto" }}
          className=""
        />
        Add New Product
      </Link>
    </div>
  );
}
