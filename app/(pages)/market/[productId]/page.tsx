"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getProductById } from "./api-productDetails";

interface product {
  category_id: number;
  country: string;
  createdAt: string;
  currency_id: number;
  description: string;
  is_active: null | boolean;
  photo_1: string;
  photo_2: null | string;
  photo_3: null | string;
  price: string;
  product_id: string;
  title: string;
  updatedAt: string;
  user_id: string;
  user_name: string;
}

export default function Product({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<product | null>(null);
  const { mutateAsync } = useMutation({
    mutationFn: getProductById,
    mutationKey: ["getProductById"],
  });

  useEffect(() => {
    const fkn = async () => {
      const res = await mutateAsync(params.productId);
      setProduct(res.data);
    };
    fkn();
  }, [mutateAsync, params.productId]);

  return (
    <main className=" container mx-auto py-16 px-2 grid">
      <div className=" flex items-center">
        <div className=" bg-gray-100  flex justify-center">
          <Image
            src={product?.photo_1 as string}
            alt={product?.title as string}
            width={1250}
            height={950}
            style={{ width: "auto", height: "auto" }}
            className=" object-cover"
          />
        </div>
        <div className=" w-full flex flex-col">
          <h2 className=" text-3xl font-bold uppercase">{product?.title}</h2>
          <p className=" text-red-600 font-semibold">{product?.price}</p>
          <p className=" text-gray-500">{product?.description}</p>
        </div>
      </div>
    </main>
  );
}
