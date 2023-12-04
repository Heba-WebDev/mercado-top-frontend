import Image from "next/image";

export interface imgae {
  src: string;
}
export default function ProductImage({ src }: imgae) {
  return (
    <div className="w-full max-h-[210px] overflow-hidden bg-gray-50">
      <Image
        src={src}
        alt=""
        width={490}
        height={80}
        className=" bg-gray-50 object-cover overflow-hidden rounded-lg"
      />
    </div>
  );
}
