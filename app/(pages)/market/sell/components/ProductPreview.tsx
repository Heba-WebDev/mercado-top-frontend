import Image from "next/image";

export default function ProductPreview() {
  return (
    <section
      className="p-6 border border-y-0 border-r-0
     gap-4 w-full flex"
    >
      <div className="max-w-lg mx-auto flex flex-col gap-4 mt-6 w-full">
        <p className="uppercase font-semibold">Privew</p>
        <div className="flex items-start justify-center">
          <Image
            src="/images/market/imagePlaceholder.svg"
            alt="preview"
            width={760}
            height={660}
            style={{ width: "600px" }}
            className=""
          />
        </div>
        <button className=" bg-gray-500 py-3  px-1 text-gray-400 rounded-lg w-full">
          Upload
        </button>
      </div>
    </section>
  );
}
