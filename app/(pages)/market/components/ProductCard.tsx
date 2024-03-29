import Link from "next/link";
import ProductUserPrice from "./ProductUserPrice";
import ProductTitlte from "./ProductTitle";
import Tags from "./Tags";
import { CATEGORIES } from "../../../utils/ListOfCategories";
import ProductImage from "./ProductImage";
type product = {
  product_id: string;
  title: string;
  description: string;
  currency_id: number;
  price: string;
  category_id: number;
  photo_1: string;
  user_name: string;
  country: string;
  posted_at: string;
};
export default function ProductCard({
  product_id,
  title,
  description,
  price,
  currency_id,
  category_id,
  photo_1,
  user_name,
  posted_at,
  country,
}: product) {
  const tag = CATEGORIES.filter((x) => x.id === category_id);
  return (
    <Link
      href={`/market/${product_id}`}
      className=" flex flex-col gap-4 border p-4 rounded z-40 shadow-md w-full"
    >
      <div className="">
        <ProductTitlte title={title} />
        <Tags tag={tag[0].label} />
      </div>
      <ProductImage src={photo_1} />
      <div>
        <ProductUserPrice
          user={user_name}
          posted_at={posted_at}
          price={price}
          country={country}
        />
      </div>
    </Link>
  );
}
