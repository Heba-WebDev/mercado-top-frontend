"use client";
import { useEffect, useState } from "react";
import { sellFormValidationSchema } from "@/app/utils/FormValidations";
import { FormValues } from "../interfaces";
import Spinner from "@/app/components/globals/Spinner";
import { Form, Formik, FormikHelpers } from "formik";
import Select from "react-select";
import { CATEGORIES } from "@/app/utils/ListOfCategories";
import { CURRENCIES } from "@/app/utils/ListOfCurrencies";
import { useAppSelector } from "@/app/hooks/store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api-sell";
import { ICreateProduct } from "../types";
import { CustomError } from "@/app/utils/CustomError";
import { toast } from "react-toastify";

export default function SellForm() {
  const user = useAppSelector((state) => state.users);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user.length === 0) {
      router.push("/market");
    }
    setLoading(false);
  }, [user, router]);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: createProduct,
    mutationKey: ["product"],
  });
  const initialValues: FormValues = {
    user_id: user[0]?.user_id,
    country: user[0]?.country,
    title: "",
    description: "",
    price: 0,
    currency: 1,
    category_id: 1,
    photo_1: null,
  };

  const handleSubmit = async (
    values: ICreateProduct,
    { setSubmitting }: FormikHelpers<ICreateProduct>
  ) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      const res = await mutateAsync(formData);
      toast.success(res?.message);
      router.push("/market");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        if (customError.isCustomError) {
          toast(customError.response.data.message);
        } else {
          console.error(customError.message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => setIsMounted(true), []);

  return (
    <main className="container mx-auto py-14 px-2 grid md:max-w-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={sellFormValidationSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {(formik) => (
          <Form className="grid gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                {formik.touched.title && formik.errors.title ? (
                  <p className=" text-red-600">{formik.errors.title}</p>
                ) : (
                  "Title"
                )}
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                {formik.touched.description && formik.errors.description ? (
                  <p className=" text-red-600">{formik.errors.description}</p>
                ) : (
                  "Description"
                )}
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="bg-[#F0EDE8] py-3 resize-none  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="photo_1">
                {formik.touched.photo_1 && formik.errors.photo_1 ? (
                  <p className=" text-red-600">{formik.errors.photo_1}</p>
                ) : (
                  "Upload Image"
                )}
              </label>
              <input
                id="photo_1"
                name="photo_1"
                type="file"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.currentTarget.files) {
                    formik.setFieldValue(
                      "photo_1",
                      event.currentTarget.files[0]
                    );
                  }
                }}
                className="bg-[#F0EDE8] py-3 px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            {isMounted && (
              <>
                <label htmlFor="category">
                  {formik.touched.category_id && formik.errors.category_id ? (
                    <p className=" text-red-600">{formik.errors.category_id}</p>
                  ) : (
                    "Category"
                  )}
                </label>
                <Select
                  id={id}
                  name="category"
                  options={CATEGORIES}
                  onChange={(option) =>
                    formik.setFieldValue("category", option?.value)
                  }
                  value={CATEGORIES.find(
                    (option) =>
                      option.value === formik.values.category_id.toString()
                  )}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#F0EDE8",
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
                        backgroundColor: "#F0EDE8",
                      },
                    }),
                  }}
                  className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
                />
              </>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">
                {formik.touched.price && formik.errors.price ? (
                  <p className=" text-red-600">{formik.errors.price}</p>
                ) : (
                  "Price"
                )}
              </label>
              <input
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            {isMounted && (
              <>
                <label htmlFor="currency">
                  {formik.touched.currency && formik.errors.currency ? (
                    <p className=" text-red-600">{formik.errors.currency}</p>
                  ) : (
                    "Currency"
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
                    (option) =>
                      option.value === formik.values.currency.toString()
                  )}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#F0EDE8",
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
                        backgroundColor: "#F0EDE8",
                      },
                    }),
                  }}
                  className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
                />
              </>
            )}
            <button
              type="submit"
              className=" bg-[#33A077] hover:bg-[#227356] py-3  px-1 text-white rounded-lg mt-4 w-full"
            >
              {formik.isSubmitting ? <Spinner /> : "Sell"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
