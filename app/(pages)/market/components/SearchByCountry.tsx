"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { countryList } from "../../../utils/ListOfCountries";
interface FormValues {
  category: string;
  country: string;
}
interface SearchByCountryProps {
  formik: FormikProps<FormValues>;
  setShowError: Function;
}
export default function SearchByCountry({
  formik,
  setShowError,
}: SearchByCountryProps) {
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
              id="country"
              name="country"
              type="country"
              onFocus={() => {
                setShowList(true);
                setShowError(false);
              }}
              onBlur={() => setShowList(false)}
              placeholder="Seach by location"
              onChange={(event) => {
                setFilter(event.target.value);
                formik.handleChange(event);
              }}
              autoComplete="off"
              value={formik.values.country}
              className="pl-6 md:pl-7 py-1 focus:outline-none w-full"
            />
            <Image
              src="/images/market/MapPin.svg"
              alt=""
              width={15}
              height={30}
              style={{ height: "auto" }}
              className=" absolute top-2 md:left-1"
            />
          </div>
          {showList && (
            <>
              <div className=" overflow-auto p-1 absolute bg-white shadow-lg w-[95%] left-2 rounded-lg h-[150px] z-50">
                {filter &&
                countryList.filter((country) =>
                  country.label
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                ).length > 0
                  ? countryList
                      .filter((country) =>
                        country.label
                          .toLocaleLowerCase()
                          .includes(filter.toLocaleLowerCase())
                      )
                      .map((country) => {
                        return (
                          <button
                            key={country.label}
                            className="p-1 block"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              formik.setFieldValue("country", country.value);
                              setShowList(false);
                            }}
                          >
                            {country.label}
                          </button>
                        );
                      })
                  : filter && <p className=" mx-auto p-2">No results found</p>}
                {!filter &&
                  countryList.map((country) => {
                    return (
                      <button
                        key={country.label}
                        className="p-1 block"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formik.setFieldValue("country", country.value);
                          setShowList(false);
                        }}
                      >
                        {country.label}
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
