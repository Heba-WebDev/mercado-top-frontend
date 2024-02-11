export default function SkeletonCard() {
  return (
    <section className="relative flex flex-col gap-4 border p-4 rounded z-50 shadow-md w-full bg-gray-50 animate-pulse">
      <h2 className="h-6 bg-gray-400 rounded w-3/4"></h2>{" "}
      <h3 className="h-6 bg-gray-400 rounded-full w-24"></h3>{" "}
      <div className="h-64 bg-gray-400 rounded"></div> {/* Image placeholder */}
      {/* Title placeholder */}
      <div className="flex justify-between">
        {/* Icon placeholder */}
        {/* Icon placeholder */}
        {/* Icon placeholder */}
      </div>
    </section>
  );
}
