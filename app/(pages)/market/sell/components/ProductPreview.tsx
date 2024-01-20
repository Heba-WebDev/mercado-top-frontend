"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/store";

export default function ProductPreview() {
  const imgs = useAppSelector((state) => state.productPreviw);
  const [index, setIndex] = useState(0);
  return (
    <section
      className="p-6 border border-y-0 border-r-0
     gap-4 w-full flex"
    >
      <div className="max-w-lg mx-auto flex flex-col gap-4 mt-6 w-full">
        <p className="uppercase font-semibold">Privew</p>
        <div className="flex items-start justify-center">
          {imgs.length === 0 && (
            <Image
              src="/images/market/imagePlaceholder.svg"
              alt="preview"
              width={760}
              height={660}
              style={{ width: "600px" }}
              className=""
            />
          )}
          {imgs.length > 0 && (
            <div className="relative w-full h-[512px]">
              <div className="overflow-hidden">
                <Image
                  src={imgs[index].url}
                  alt="preview"
                  width={760}
                  height={300}
                  style={{ width: "600px" }}
                  className="absolute overflow-hidden h-full object-cover"
                />
              </div>
              <div className=" absolute flex gap-4 bottom-2 left-[40%]">
                <button onClick={() => setIndex(0)}>
                  <Image
                    src={
                      imgs.length >= 1
                        ? "/images/market/active-slide.svg"
                        : "/images/market/inactive-slide.svg"
                    }
                    alt="slide"
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "auto" }}
                    className=" border-2 border-white rounded-full "
                  />
                </button>
                <button
                  onClick={() => {
                    if (imgs.length >= 2) {
                      setIndex(1);
                    }
                  }}
                >
                  <Image
                    src={
                      imgs.length >= 2
                        ? "/images/market/active-slide.svg"
                        : "/images/market/inactive-slide.svg"
                    }
                    alt="slide"
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "auto" }}
                    className=" border-2 border-white rounded-full "
                  />
                </button>
                <button
                  onClick={() => {
                    if (imgs.length >= 3) {
                      setIndex(2);
                    }
                  }}
                >
                  <Image
                    src={
                      imgs.length >= 3
                        ? "/images/market/active-slide.svg"
                        : "/images/market/inactive-slide.svg"
                    }
                    alt="slide"
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "auto" }}
                    className=" border-2 border-white rounded-full "
                  />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <button className=" bg-gray-500 py-3  px-1 text-gray-400 rounded-lg w-full">
          Change thumbnail
        </button> */}
      </div>
    </section>
  );
}
