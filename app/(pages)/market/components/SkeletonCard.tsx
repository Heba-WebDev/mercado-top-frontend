export default function SkeletonCard() {
  return (
    <section className="relative flex flex-col gap-4 border p-4 rounded z-50 shadow-md w-full bg-gray-50 animate-pulse">
      <div className="h-64 bg-gray-400 rounded"></div> {/* Image placeholder */}
      <h2 className="h-6 bg-gray-400 rounded w-3/4"></h2>{" "}
      {/* Title placeholder */}
      <div className="flex justify-between">
        <div className="h-5 w-5 bg-gray-400 rounded-full"></div>{" "}
        {/* Icon placeholder */}
        <div className="h-5 w-5 bg-gray-400 rounded-full"></div>{" "}
        {/* Icon placeholder */}
        <div className="h-5 w-5 bg-gray-400 rounded-full"></div>{" "}
        {/* Icon placeholder */}
      </div>
    </section>
  );
}
