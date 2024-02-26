"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getProductById } from "./api-productDetails";
import ImagePreview from "./components/ImagePreview";
import Details from "./components/Details";
import ProductNav from "./components/ProductNav";

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
      <ProductNav
        title={product?.title as string}
        id={product?.product_id as string}
      />
      <hr className="my-3 opacity-50" />
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 py-4 gap-4">
        <ImagePreview
          photo_1={product?.photo_1}
          photo_2={product?.photo_2}
          photo_3={product?.photo_3}
          title={product?.title}
        />
        <Details
          title={product?.title as string}
          description={product?.description as string}
          price={product?.price as string}
          currency_id={product?.currency_id as number}
          country={product?.country as string}
          user_id={product?.user_id as string}
          user_name={product?.user_name as string}
          category={product?.category_id as number}
        />
      </div>
    </main>
  );
}
