import SellForm from "./components/Form";

export default function Sell() {
  return (
    <main className="container mx-auto py-24 px-2 grid gap-4 md:justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          You no longer need it?
        </h1>
        <p className=" text-center">
          Sell any item you have at home on Mercado Top
        </p>
      </div>
      <SellForm />
    </main>
  );
}
