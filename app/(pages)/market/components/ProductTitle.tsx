export interface title {
  title: string;
}
export default function ProductTitlte({ title }: title) {
  return (
    <>
      <h2 className="text-2xl font-semibold">
        {title.length > 26 ? `${title.slice(0, 27)}...` : title}
      </h2>
    </>
  );
}
