import ProductCard from "./ProductCard";

export default function ProductsList() {
  return (
    <section className="mt-12 md:mt-14 md:pt-14 pb-32 grid">
      <div className="grid md:grid-cols-3 gap-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <button className="text-center underline pt-14 mx-auto font-semibold">
        Show more
      </button>
    </section>
  );
}
