import Image from "next/image";

export interface imgae {
  src: string;
}
export default function ProductImage({ src }: imgae) {
  return (
    <div className="overflow-hidden">
      <Image
        src={src}
        alt=""
        priority
        width={180}
        height={180}
        style={{ width: "620px", height: "165px" }}
        className=" bg-gray-50 object-contain overflow-hidden rounded"
      />
    </div>
  );
}
