import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";
import Select from "react-select";
import { CATEGORIES } from "@/app/utils/ListOfCategories";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
  id: string;
}

export default function Category({ formik }: ProductTitleProps, id: string) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return (
    <>
      {isMounted && (
        <>
          <label htmlFor="category_id">
            {formik.touched.category_id && formik.errors.category_id ? (
              <p className=" text-red-600">{formik.errors.category_id}</p>
            ) : (
              "Product Category"
            )}
          </label>
          <Select
            id={id}
            name="category_id"
            options={CATEGORIES}
            onChange={(option) => {
              formik.setFieldValue("category_id", option?.id);
            }}
            value={CATEGORIES.find(
              (option) => option.id === formik.values.category_id
            )}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "",
                border: 0,
                borderColor: state.isFocused ? "green" : provided.borderColor,
                boxShadow: state.isFocused
                  ? "0 0 0 1px green"
                  : provided.boxShadow,
                "&:hover": {
                  borderColor: state.isFocused ? "green" : provided.borderColor,
                },
              }),
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "green" : provided.color,
                backgroundColor: state.isSelected
                  ? "#F0EDE8"
                  : provided.backgroundColor,
                "&:hover": {
                  color: "green",
                  backgroundColor: "",
                },
              }),
            }}
            className="border py-3 px-2 rounded-lg focus:outline-[#33A077]"
          />
        </>
      )}
    </>
  );
}

{
  /*

    {isMounted && (
            <>
              <label htmlFor="category_id">
                {formik.touched.category_id && formik.errors.category_id ? (
                  <p className=" text-red-600">{formik.errors.category_id}</p>
                ) : (
                  "Product Category"
                )}
              </label>
              <Select
                id={id}
                name="category_id"
                options={CATEGORIES}
                onChange={(option) =>
                  formik.setFieldValue("category_id", option?.id)
                }
                value={CATEGORIES.find(
                  (option) => option.id === formik.values.category_id
                )}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "",
                    border: 0,
                    borderColor: state.isFocused
                      ? "green"
                      : provided.borderColor,
                    boxShadow: state.isFocused
                      ? "0 0 0 1px green"
                      : provided.boxShadow,
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "green"
                        : provided.borderColor,
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "green" : provided.color,
                    backgroundColor: state.isSelected
                      ? "#F0EDE8"
                      : provided.backgroundColor,
                    "&:hover": {
                      color: "green",
                      backgroundColor: "",
                    },
                  }),
                }}
                className="border py-3 px-2 rounded-lg focus:outline-[#33A077]"
              />
            </>
          )}

*/
}
