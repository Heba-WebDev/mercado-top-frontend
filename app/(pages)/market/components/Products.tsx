import AddAProduct from "./AddAProduct";
import ProductCard from "./ProductCard";
import SearchProducts from "./SearchProducts";
import { useAppSelector } from "@/app/hooks/store";

export default function Products() {
  const products = useAppSelector((state) => state.products);
  const productsArr = products.products[0].data;
  return (
    <section className="container mx-auto px-2">
      <AddAProduct />
      <div className=" border border-opacity-10 rounded px-4 py-8 grid gap-12">
        <div>
          <SearchProducts />
        </div>
        <div className="">
          <div className="grid md:grid-cols-3 gap-8 container mx-auto pb-10">
            {productsArr.map((product) => {
              return (
                <ProductCard
                  key={product.product_id}
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
          {productsArr.length >= 8 && (
            <>
              <button className="underline pt-14 flex mx-auto font-semibold">
                Show more
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
