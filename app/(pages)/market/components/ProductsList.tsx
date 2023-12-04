import ProductImage from "./ProductImage";
import ProductTitleDescription from "./ProductTitleDescription";
import ProductUserPrice from "./ProductUserPrice";
import { products } from "./ProductsArray";

export default function ProductsList() {
  return (
    <section className="mt-12 md:mt-14 md:pt-14 pb-32 grid">
      <div className="grid md:grid-cols-3 gap-8 ">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className={`flex flex-col items-center justify-between  px-0 pb-2 rounded-lg shadow-xl`}
            >
              <ProductImage src={product.picture} />
              <div className="w-full p-2">
                <ProductTitleDescription
                  title={product.title}
                  description={product.description}
                />
                <ProductUserPrice
                  price={product.price}
                  country={product.country}
                  user="random_12"
                  date="2 Days ago"
                />
              </div>
            </div>
          );
        })}
      </div>
      <button className="text-center underline pt-14 mx-auto font-semibold">
        Show more
      </button>
    </section>
  );
}
