"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { redirect } from "next/navigation";
import { signInUser } from "../api-signin";
import { ISignIn } from "..";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
});
interface FormValues {
  email: string;
  password: string;
}

export default function SignUpForm() {
  const { mutateAsync } = useMutation({
    mutationFn: signInUser,
    mutationKey: ["signin"],
  });
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ISignIn) => {
    try {
      const res = await mutateAsync(values);
      toast.success(res?.message);
      setTimeout(() => {
        redirect("/");
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
          <button
            type="submit"
            className=" bg-green-700 hover:bg-green-600 py-3  px-1 text-white rounded-lg mt-4 w-full"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}
