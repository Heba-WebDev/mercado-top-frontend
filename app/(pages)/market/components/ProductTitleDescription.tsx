export interface details {
  title: string;
  description: string;
}

export default function ProductTitleDescription({
  title,
  description,
}: details) {
  return (
    <div className="flex items-center gap-3 border border-x-0 border-t-0 pb-4 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="underline text-[#33A077] text-xl font-semibold">
          {title}
        </h2>
        <p className="text-sm text-[#666]">
          {description.slice(0, 45)}
          {"..."}
        </p>
      </div>
    </div>
  );
}
