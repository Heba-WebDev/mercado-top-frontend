import AddAProduct from "./components/AddAProduct";
import ProductsList from "./components/ProductsList";
import SearchProducts from "./components/SearchProducts";

export default function Productos() {
  return (
    <main className="">
      <AddAProduct />
      <div className=" container mx-auto px-2">
        <SearchProducts />
        <ProductsList />
      </div>
    </main>
  );
}
