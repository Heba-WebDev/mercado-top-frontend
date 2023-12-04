export interface product {
  id: number;
  picture: string;
  title: string;
  description: string;
  price: string;
  country: string;
}
export const products: product[] = [
  {
    id: 0,
    picture: "/images/market/s-l1600.jpg",
    title: "LG 2XL 2020 TV",
    description: "Color black, with remote control and in a good condition",
    price: "510",
    country: "Argentina",
  },
  {
    id: 1,
    picture: "/images/market/iphone-used.jpeg",
    title: "Iphone 12 256GB",
    description: "Battery at 92%",
    price: "840",
    country: "Brazil",
  },
  {
    id: 2,
    picture: "/images/market/garden-kit.jpeg",
    title: "Out of the box garden kit",
    description:
      "Reason to sell: I no longer can go to the farm due to an allergy",
    price: "310",
    country: "Bulgaria",
  },
  {
    id: 3,
    picture: "/images/market/used-sofa.jpeg",
    title: "Large sofa good as new",
    description: "Very comfortable. Enough for a family of 3.",
    price: "310",
    country: "Spain",
  },
];
