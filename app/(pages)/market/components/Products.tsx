import Image from "next/image";
import AddAProduct from "./AddAProduct";
import NoProductFound from "./NoProductFound";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import SearchProducts from "./SearchProducts";
import { useAppSelector, useAppDispatch } from "@/app/hooks/store";
import { fetchProducts } from "@/app/store/products/slice";
import { useEffect } from "react";

export default function Products() {
  const products = useAppSelector((state) => state.products);
  const productsArr = products.products[0].data;
  const dispatch = useAppDispatch();
  return (
    <section className="container mx-auto px-2 relative">
      <AddAProduct />
      <div className="relative border border-opacity-10 rounded px-4 py-8 grid gap-12">
        <div className="z-50">
          <SearchProducts />
        </div>
        <div className=" absolute top-[10%] md:top-[12.5%] right-5">
          <button
            type="button"
            onClick={() => {
              dispatch(fetchProducts());
            }}
          >
            <Image
              src="/images/market/refresh.svg"
              alt="refresh products"
              width={15}
              height={15}
              style={{ width: "16px", height: "auto" }}
            />
          </button>
        </div>
        {productsArr.length === 0 && (
          <>
            <NoProductFound />
          </>
        )}
        {productsArr.length > 0 && (
          <>
            <div className="z-30">
              <div className="grid md:grid-cols-3 gap-8 container mx-auto pb-10">
                {productsArr.length &&
                  productsArr.map((product) => {
                    return (
                      <ProductCard
                        key={product.product_id}
                        product_id={product.product_id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        currency_id={product.currency_id}
                        category_id={product.category_id}
                        photo_1={product.photo_1}
                        country={product.country}
                        user_name={product.user_name}
                        posted_at={product.posted_at as string}
                      />
                    );
                  })}
              </div>
              {productsArr.length && (
                <div className="flex items-center justify-end">
                  <Pagination />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
