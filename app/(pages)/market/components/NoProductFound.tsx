import { useAppDispatch } from "@/app/hooks/store";
import { fetchProducts } from "@/app/store/products/slice";
export default function NoProductFound() {
  const dispatch = useAppDispatch();
  return (
    <div className=" flex flex-col gap-2 justify-center items-center">
      <h2 className=" font-bold text-5xl">Ooops...</h2>
      <h3 className=" text-2xl">No product found</h3>
      <p className=" text-lg max-w-[44ch] mx-auto text-center mb-4">
        Sorry! The category or/and lcation you are looking for does not have
        products at the moment.
      </p>
      <button
        type="button"
        onClick={() => {
          dispatch(fetchProducts());
        }}
        className=" bg-[#33A077] px-6 py-1 text-white"
      >
        Go Back
      </button>
    </div>
  );
}
