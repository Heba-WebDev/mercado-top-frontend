import Image from "next/image";
import { CATEGORIES } from "../../../../utils/ListOfCategories";
import { CURRENCIES } from "../../../../utils/ListOfCurrencies";
import Tags from "../../components/Tags";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
type props = {
  title: string;
  country: string;
  currency_id: number;
  description: string;
  price: string;
  user_id: string;
  user_name: string;
  category: number;
};
export default function Details({
  title,
  country,
  currency_id,
  description,
  price,
  user_name,
  user_id,
  category,
}: props) {
  const cate = CATEGORIES?.filter((x) => x?.id === category);
  const currency = CURRENCIES.filter((x) => x.id === currency_id);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  return (
    <section className=" flex flex-col gap-4">
      <Tags tag={cate[0]?.value} />
      <div>
        <h2 className=" text-4xl font-bold uppercase">{title}</h2>
        <div className="flex items-center gap-1">
          <Image
            alt={user_name ? user_name : ""}
            src="/images/market/profile-circle.svg"
            width={15}
            height={15}
            style={{ width: "28px" }}
          />
          <p className=" font-bold underline text-sm text-gray-500">
            {user_name}
          </p>
        </div>
      </div>
      <div>
        <p className=" text-gray-600 text-lg">{description}.</p>
      </div>
      <div>
        <p className=" text-gray-600 text-2xl font-semibold">
          {price}
          {currency[0]?.value}
        </p>
      </div>
      {/* <div>
        <p className=" text-sm font-semibold uppercase">
          Sold By: <span className=" font-medium normal-case">{user_name}</span>
        </p>
      </div> */}
      <div className=" flex items-center gap-3">
        <p>Share:</p>
        <div className=" flex items-center gap-4">
          <FacebookShareButton url={shareUrl} title={title}>
            <FacebookIcon size={25} className=" rounded-full" />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={25} className=" rounded-full" />
          </TwitterShareButton>
          <PinterestShareButton media="" url={shareUrl} title={title}>
            <PinterestIcon size={25} className=" rounded-full" />
          </PinterestShareButton>
        </div>
      </div>
    </section>
  );
}
