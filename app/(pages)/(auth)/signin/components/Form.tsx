"use client";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { signInUser } from "../api-signin";
import { ISignIn } from "../types";
import { useRouter } from "next/navigation";
import ForgotPassModalOpen from "./ForgotPasswordModal";
import Spinner from "@/app/components/globals/Spinner";
import { addUser } from "@/app/store/users/slice";
import { useAppDispatch } from "@/app/hooks/store";
import Image from "next/image";

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

export default function SignInForm() {
  const disptach = useAppDispatch();
  const router = useRouter();
  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: signInUser,
    mutationKey: ["signin"],
  });
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleForgetPassModal = () => {
    setIsForgotPassModalOpen(!isForgotPassModalOpen);
  };

  const handleSubmit = async (values: ISignIn) => {
    try {
      const res = await mutateAsync(values);
      toast.success(res?.message);
      disptach(addUser(res.data));
      router.push("/");
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
    <>
      {isForgotPassModalOpen && (
        <ForgotPassModalOpen closeModal={handleForgetPassModal} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {(formik) => (
          <Form className="grid gap-3">
            <div className="flex flex-col gap-2 relative">
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
                className="border pl-10 focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
              <Image
                src="/images/globals/email.svg"
                alt="name"
                width={30}
                height={30}
                style={{ width: "25px", height: "25px" }}
                className=" absolute top-[52%] left-2"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
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
                type={showPassword ? "text" : "password"}
                autoComplete="true"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border pl-10 focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
              <Image
                src="/images/globals/user-edit.svg"
                alt="username"
                width={30}
                height={30}
                style={{ width: "25px", height: "25px" }}
                className=" absolute top-[50%] left-2 opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Image
                    src="/images/globals/eye.svg"
                    alt="show password"
                    width={20}
                    height={10}
                    className="absolute top-[53%] right-4"
                  />
                ) : (
                  <Image
                    src="/images/globals/eye-slash.svg"
                    alt="show password"
                    width={20}
                    height={10}
                    className="absolute top-[53%] right-4"
                  />
                )}
              </button>
            </div>
            <button
              type="button"
              className=" text-[#33A077] text-right"
              onClick={handleForgetPassModal}
            >
              Forgot your password?
            </button>
            <button
              type="submit"
              className=" bg-[#33A077] hover:bg-[#227356] py-3  px-1 text-white rounded-lg mt-4 w-full"
            >
              {formik.isSubmitting ? <Spinner /> : "Sign in"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
