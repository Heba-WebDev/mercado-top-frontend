import Image from "next/image";
import React from "react";

interface WhatWeDoCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
}

export const WhatWeDoCard: React.FC<WhatWeDoCardProps> = ({
  title,
  description,
  link,
  image,
}) => {
  return (
    <div className="grid gap-2 bg-[#F0EDE8] p-4">
      <div>
        <Image
          src={image}
          alt=""
          width={530}
          height={300}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="">
        <h4 className="text-2xl font-semibold pb-1">{title}</h4>
      </div>
      <div className="">
        <p className="flex-grow pb-3">{description}</p>
      </div>
    </div>
  );
};
