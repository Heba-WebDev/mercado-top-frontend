import { useState, useEffect } from "react";
import { paginationOptions } from "@/app/utils/PaginationOptions";
import Select from "react-select";
import { setLimit } from "@/app/store/pagination/index";
import { useAppDispatch, useAppSelector } from "@/app/hooks/store";
import PaginationButtons from "./PaginationButtons";

const initialValues = {
  limit: 5,
  page: 1,
};

export default function Pagination() {
  const currentLimit = useAppSelector((state) => state.pagination.limit);
  const [pagination, setPagination] = useState({
    limit: currentLimit,
    page: 1,
  });
  const [page, setPage] = useState(1);
  const totalPages = useAppSelector((state) => state.products.totalPages);
  const dispatch = useAppDispatch();
  const handleLimitChange = async (
    selectedOption: {
      label: string;
      value: string;
    } | null
  ) => {
    setPagination({ limit: Number(selectedOption?.value), page: page });
    dispatch(setLimit({ limit: Number(selectedOption?.value), page: page }));
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setLimit({ limit: pagination.limit, page: newPage }));
  };
  return (
    <div className=" flex flex-wrap gap-2 items-center">
      <Select
        className="max-w-[140px] h-[35px] flex items-center border rounded-lg "
        value={paginationOptions.find(
          (option) => option.value === String(pagination.limit)
        )}
        name="pagination"
        onChange={handleLimitChange}
        options={paginationOptions}
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "",
            border: 0,
            borderColor: state.isFocused ? "" : provided.borderColor,
            boxShadow: state.isFocused ? "0 0 0 1px green" : provided.boxShadow,
            "&:hover": {
              borderColor: state.isFocused ? "green" : provided.borderColor,
            },
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "green" : provided.color,
            backgroundColor: state.isSelected ? "" : provided.backgroundColor,
            "&:hover": {
              color: "green",
              backgroundColor: "",
            },
          }),
        }}
      />
      <PaginationButtons
        totalPages={totalPages}
        setPage={handlePageChange}
        page={page}
      />
    </div>
  );
}
