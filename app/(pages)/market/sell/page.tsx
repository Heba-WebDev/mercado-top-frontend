import SellForm from "./components/Form";
import ProductPreview from "./components/ProductPreview";

export default function Sell() {
  return (
    <main className="py-24 px-2 md:px-0 grid ">
      <div className="flex flex-col gap-4 border border-x-0 border-t-0 pb-8 w-full">
        <h1 className="container mx-auto text-4xl font-semibold">
          Add New Product
        </h1>
      </div>
      <div className="container mx-auto grid lg:grid-cols-2 gap-x-6">
        <SellForm />
        <ProductPreview />
      </div>
    </main>
  );
}
