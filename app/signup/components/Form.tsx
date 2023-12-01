"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signUpUser } from "../api-signup";
import { ISignUp } from "../types";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { redirect } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be 2 characters or more")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is required"),
  country: Yup.string().required("Country is required"),
});
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export default function SignUpForm() {
  const { mutateAsync } = useMutation({
    mutationFn: signUpUser,
    mutationKey: ["signup"],
  });
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  };

  const handleSubmit = async (values: ISignUp) => {
    try {
      const res = await mutateAsync(values);
      toast.success(res?.message);
      setTimeout(() => {
        redirect("/signin");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        if (customError.isCustomError) {
          toast(customError.response.data.message);
        } else {
          console.error(customError.message);
        }
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              {formik.touched.name && formik.errors.name ? (
                <p className=" text-red-600">{formik.errors.name}</p>
              ) : (
                "Name"
              )}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-green-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              {formik.touched.email && formik.errors.email ? (
                <p className=" text-red-600">{formik.errors.email}</p>
              ) : (
                "Email"
              )}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-green-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              {formik.touched.password && formik.errors.password ? (
                <p className=" text-red-600">{formik.errors.password}</p>
              ) : (
                "Password"
              )}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="true"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-green-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className=" text-red-600">{formik.errors.confirmPassword}</p>
              ) : (
                "Confirm Password"
              )}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="true"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-green-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country">
              {formik.touched.country && formik.errors.country ? (
                <p className=" text-red-600">{formik.errors.country}</p>
              ) : (
                "Country"
              )}
            </label>
            <select
              name="country"
              className="bg-[#F0EDE8] py-3  px-1 rounded-lg focus:outline-green-700"
              onChange={(event) => {
                formik.setFieldValue("country", event.target.value);
              }}
              value={formik.values.country}
            >
              <option value="">Select a country</option>
              <option value="brazil">Brazil</option>
              <option value="argentina">Argentina</option>
              <option value="benin">Benin</option>
            </select>
          </div>

          <button
            type="submit"
            className=" bg-green-700 hover:bg-green-600 py-3  px-1 text-white rounded-lg mt-4 w-full"
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
}
