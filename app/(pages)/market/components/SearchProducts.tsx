"use client";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/app/hooks/store";
import { setSearchCategoryLocation } from "@/app/store/searchProducts";
import { useMutation } from "@tanstack/react-query";
import SearchByCategory from "./SearchByCategory";
import SearchByCountry from "./SearchByCountry";
import { CATEGORIES } from "../../../utils/ListOfCategories";
import { countryList } from "../../../utils/ListOfCountries";
import { fetchProductsByCategoryLocation } from "@/app/store/products/slice";

// const validationSchema = Yup.object({
//   category: Yup.string()
//     .category("Invalid Category address")
//     .required("Emacategoryil is required"),
//   password: Yup.string()
//     .min(6, "Must be 6 characters or more")
//     .required("Password is required"),
// });
interface FormValues {
  category: string;
  country: string;
}

export default function SearchProducts() {
  const initialValues: FormValues = {
    category: "",
    country: "",
  };
  const [showError, setShowError] = useState(false);
  const disptach = useAppDispatch();
  const handleSubmit = async (values: FormValues) => {
    const categoryExist = CATEGORIES.filter(
      (category) =>
        category.value.toLocaleLowerCase() ===
        values.category.toLocaleLowerCase()
    );
    const countryExist = countryList.filter(
      (country) =>
        country.value.toLocaleLowerCase() === values.country.toLocaleLowerCase()
    );
    if (!values.category && !values.country) {
      setShowError(true);
    } else if (
      !values.category &&
      values.country &&
      countryExist.length === 0
    ) {
      setShowError(true);
    } else if (
      !values.country &&
      values.category &&
      categoryExist.length === 0
    ) {
      setShowError(true);
    } else if (
      values.category &&
      values.country &&
      (categoryExist.length === 0 || countryExist.length === 0)
    ) {
      setShowError(true);
    } else {
      disptach(
        setSearchCategoryLocation({
          category: categoryExist[0]?.value ? categoryExist[0]?.value : "",
          country: countryExist[0]?.value ? countryExist[0].value : "",
        })
      );
      disptach(fetchProductsByCategoryLocation());
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      //validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="relative z-50 flex flex-col gap-4 w-full"
    >
      {(formik) => (
        <Form
          className="relative bg-white flex flex-col md:flex-row items-center w-full border
        p-3  mx-auto rounded-lg gap-4 md:gap-0"
        >
          <SearchByCategory formik={formik} setShowError={setShowError} />
          <SearchByCountry formik={formik} setShowError={setShowError} />
          <button
            type="submit"
            className="bg-white hover:bg-[#33A077] text-[#33A077]
             border-2 hover:border-transparent border-[#33A077]
             py-3  px-1 hover:text-white md:max-w-[120px] w-full"
          >
            Search
          </button>
          {showError && (
            <p className=" text-red-500 text-sm md:absolute top-[70%]">
              Please choose a valid category and/or a valid location
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
}
