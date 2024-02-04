"use client";
import { useEffect, useState } from "react";
import { sellFormValidationSchema } from "@/app/utils/FormValidations";
import { FormValues } from "../interfaces";
import Spinner from "@/app/components/globals/Spinner";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppSelector, useAppDispatch } from "@/app/hooks/store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api-sell";
import { ICreateProduct } from "../types";
import { CustomError } from "@/app/utils/CustomError";
import { toast } from "react-toastify";
import { fetchProducts, productSlice } from "@/app/store/products/slice";
import ProductTitle from "./Title";
import Category from "./Category";
import Description from "./Description";
import Price from "./Price";
import Currency from "./Currency";
import ProductImages from "./ProductImages";
import Quantity from "./Quantity";

export default function SellForm() {
  const user = useAppSelector((state) => state.users);
  const pagination = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = Math.floor(Math.random() * 10001).toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    if (user.length === 0) {
      router.push("/market");
    }
    setLoading(false);
  }, [user, router]);
  const [loading, setLoading] = useState(true);

  const { mutateAsync } = useMutation({
    mutationFn: createProduct,
    mutationKey: ["product"],
  });
  const initialValues: FormValues = {
    user_id: user[0]?.user_id as string,
    country: user[0]?.country,
    title: "",
    description: "",
    price: 0,
    currency: 0,
    quantity: 0,
    category_id: 0,
    photo_1: null,
    photo_2: null,
    photo_3: null,
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
      dispatch(productSlice.actions.addProduct(res.data));
      dispatch(fetchProducts());
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

  return (
    <main className="container mx-auto py-6 px-2 grid gap-y-8 border rounded-lg mt-6">
      <h3 className=" uppercase font-semibold">PRODUCT DETAILS</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={sellFormValidationSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {(formik) => (
          <Form className="grid gap-3 pb-6">
            <ProductTitle formik={formik} />
            <Description formik={formik} />
            <ProductImages formik={formik} />
            <Category formik={formik} id={id} />
            <Price formik={formik} />
            <Currency formik={formik} id={id} />
            <Quantity formik={formik} />

            <button
              type="submit"
              className=" bg-[#33A077] hover:bg-[#227356] py-3  px-1 text-white rounded-lg mt-4 w-full"
            >
              {formik.isSubmitting ? <Spinner /> : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
