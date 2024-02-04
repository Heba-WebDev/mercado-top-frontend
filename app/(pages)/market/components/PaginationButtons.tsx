import { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/store";

interface params {
  totalPages: number;
  setPage: Function;
  page: number;
}

export default function PaginationButtons({
  totalPages,
  setPage,
  page,
}: params) {
  const state = useAppSelector((state) => state.pagination);
  const getPaginationGroup = () => {
    if (totalPages < 6) {
      return new Array(totalPages).fill(0).map((_, index) => index + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (page >= 3 && page < totalPages - 1) {
      return [1, "...", page - 2, page - 1, page, page + 1, "...", totalPages];
    }
    if (page > totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [];
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
          }
        }}
      >
        <Image
          src="/images/market/back.svg"
          alt="previous page"
          width={30}
          height={30}
          style={{ width: "30px", height: "auto" }}
        />
      </button>
      <div className="flex justify-center items-center gap-1">
        {getPaginationGroup().map((item, index) => (
          <div
            key={index}
            className={`w-8 h-8 hover:cursor-pointer bg-gray-50 rounded-lg flex items-center justify-center ${
              typeof item === "number" && item === state.page
                ? "text-[#33A077] border rounded-lg border-[#33A077]"
                : ""
            }`}
            onClick={() => {
              if (typeof item === "number") {
                setPage(item);
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          if (page < totalPages) {
            const newPage = page + 1;
            setPage(newPage);
          }
        }}
      >
        <Image
          src="/images/market/forward.svg"
          alt="next page"
          width={30}
          height={30}
          style={{ width: "30px", height: "auto" }}
          className=""
        />
      </button>
    </div>
  );
}
