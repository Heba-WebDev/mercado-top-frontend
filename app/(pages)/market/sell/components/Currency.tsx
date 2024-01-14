import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";
import Select from "react-select";
import { CURRENCIES } from "@/app/utils/ListOfCurrencies";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
  id: string;
}

export default function Currency({ formik }: ProductTitleProps, id: string) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return (
    <>
      {isMounted && (
        <>
          <label htmlFor="currency">
            {formik.touched.currency && formik.errors.currency ? (
              <p className=" text-red-600">{formik.errors.currency}</p>
            ) : (
              "Price Currency"
            )}
          </label>
          <Select
            id={id}
            name="currency"
            options={CURRENCIES}
            onChange={(option) => formik.setFieldValue("currency", option?.id)}
            value={CURRENCIES.find(
              (option) => option.value === formik.values.currency.toString()
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
              <label htmlFor="currency">
                {formik.touched.currency && formik.errors.currency ? (
                  <p className=" text-red-600">{formik.errors.currency}</p>
                ) : (
                  "Price Currency"
                )}
              </label>
              <Select
                id={id}
                name="currency"
                options={CURRENCIES}
                onChange={(option) =>
                  formik.setFieldValue("currency", option?.id)
                }
                value={CURRENCIES.find(
                  (option) => option.value === formik.values.currency.toString()
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
