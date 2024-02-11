"use client";
import { useState } from "react";
import Image from "next/image";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { CATEGORIES } from "../../../utils/ListOfCategories";
interface FormValues {
  category: string;
  country: string;
}
interface SearchByCategoryProps {
  formik: FormikProps<FormValues>;
  setShowError: Function;
}
export default function SearchByCategory({
  formik,
  setShowError,
}: SearchByCategoryProps) {
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState("");
  const initialValues: FormValues = {
    category: "",
    country: "",
  };
  const handleSubmit = async () => {};
  return (
    <section className="w-full relative">
      <Formik
        initialValues={initialValues}
        //validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className=" relative flex flex-col gap-4 w-full"
      >
        <>
          <div className="relative w-full">
            <input
              id="category"
              name="category"
              type="category"
              onFocus={() => {
                setShowList(true);
                setShowError(false);
              }}
              onBlur={() => setShowList(false)}
              placeholder="Seach by category"
              onChange={(event) => {
                setFilter(event.target.value);
                formik.handleChange(event);
              }}
              autoComplete="off"
              value={formik.values.category}
              className="pl-6 md:pl-7 py-1 focus:outline-none w-full"
            />
            <Image
              src="/images/market/glassmagnifying.svg"
              alt=""
              width={15}
              height={30}
              style={{ width: "auto" }}
              className=" absolute top-2 md:left-1"
            />
          </div>
          {showList && (
            <>
              <div className=" overflow-auto p-1 absolute bg-white shadow-lg w-[95%] left-2 rounded-lg h-[150px] z-50">
                {filter &&
                CATEGORIES.filter((category) =>
                  category.label
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                ).length > 0
                  ? CATEGORIES.filter((category) =>
                      category.label
                        .toLocaleLowerCase()
                        .includes(filter.toLocaleLowerCase())
                    ).map((category) => {
                      return (
                        <button
                          key={category.label}
                          className="p-1 block"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            formik.setFieldValue("category", category.value);
                            setShowList(false);
                          }}
                        >
                          {category.label}
                        </button>
                      );
                    })
                  : filter && <p className=" mx-auto p-2">No results found</p>}
                {!filter &&
                  CATEGORIES.map((category) => {
                    return (
                      <button
                        key={category.label}
                        className="p-1 block"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formik.setFieldValue("category", category.value);
                          setShowList(false);
                        }}
                      >
                        {category.label}
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </>
      </Formik>
    </section>
  );
}
