"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/store";
import { fetchProducts } from "@/app/store/products/slice";
import SkeletonCard from "./SkeletonCard";
import FailureToFetchProducts from "./FailureToFetchProducts";
import Products from "./Products";

export default function ProductsList() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const status = useAppSelector((state) => state.products?.status);
  const error = useAppSelector((state) => state.products?.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    if (status === "succeeded") {
      setIsLoading(false);
    }
  }, [status, dispatch]);

  return (
    <section className="mt-12 md:mt-14 md:pt-14 pb-32 grid">
      {isLoading && (
        <div className="grid grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {status === "failed" && <FailureToFetchProducts />}
      {status === "succeeded" && <Products />}
    </section>
  );
}
