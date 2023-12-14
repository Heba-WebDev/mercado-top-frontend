export interface title {
  title: string;
}
export default function ProductTitlte({ title }: title) {
  return (
    <>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </>
  );
}
