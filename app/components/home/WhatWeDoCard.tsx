import Link from "next/link";
import React from "react";

interface WhatWeDoCardProps {
  title: string;
  description: string;
  link: string;
}

export const WhatWeDoCard: React.FC<WhatWeDoCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="grid gap-2 bg-[#F0EDE8] p-4">
      <div className="">
        <h4 className="text-2xl font-semibold pb-1">{title}</h4>
      </div>
      <div className="">
        <p className="flex-grow pb-3">{description}</p>
      </div>
      <div className="mt-auto flex justify-end">
        <Link href={link} className="">
          Learn more &gt;
        </Link>
      </div>
    </div>
  );
};
