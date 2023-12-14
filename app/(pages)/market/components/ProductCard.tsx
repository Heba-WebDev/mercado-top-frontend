import ProductUserPrice from "./ProductUserPrice";
import PriceTag from "./PriceTag";
import ProductTitlte from "./ProductTitle";
import Tags from "./Tags";
import ProductImage from "./ProductImage";
export default function ProductCard() {
  return (
    <div className="relative flex flex-col gap-4 border p-4 rounded z-50 shadow-md w-full">
      <PriceTag price={`155`} />
      <div className=" pt-6">
        <ProductTitlte title="LG TV X02 2020" />
        <Tags tag="Electronics" />
      </div>
      <ProductImage src="" />
      <div>
        <ProductUserPrice
          user="Heba"
          date="2Days"
          price="340"
          country="Brazil"
        />
      </div>
    </div>
  );
}
