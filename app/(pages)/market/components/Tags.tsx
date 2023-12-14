export interface Tag {
  tag: string;
}

const tagStyles: { [key: string]: string } = {
  Electronics: "bg-yellow-400",
  "Mobile Phones": "bg-fuchsia-400",
  "Toys & Games": "bg-emerald-400",
  Books: "bg-teal-600",
  Appliances: "bg-lime-400",
  "Office Equipment": "bg-sky-400",
  Furnitures: "bg-cyan-500",
};

export default function Tags({ tag }: Tag) {
  const tagStyle = tagStyles[tag];

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2 text-white">
      {tagStyle && <span className={`${tagStyle} px-4 rounded-xl`}>{tag}</span>}
    </div>
  );
}
