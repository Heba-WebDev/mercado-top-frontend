"use client";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Spinner from "@/app/components/globals/Spinner";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordFn } from "./api-reset-password";
import { IResetPassword } from "./types";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password must match")
    .required("Confirm Password is required"),
});
interface FormValues {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Page() {
  const [isParamsPresent, setIsParamsPresent] = useState(false);
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: ResetPasswordFn,
    mutationKey: ["resetPassword"],
  });
  const handleParams = () => {
    if (params.size === 0) {
      router.push("/");
    } else {
      setIsParamsPresent(!isParamsPresent);
    }
  };
  const initialValues: FormValues = {
    token: token as string,
    email: email as string,
    newPassword: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values: IResetPassword) => {
    try {
      const res = await mutateAsync(values);
      toast(res.message);
      router.push("/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        toast(customError.response.data.message);
        router.push("/signin");
      }
    }
  };
  useEffect(() => {
    handleParams();
  }, []);
  return (
    <main className=" container mx-auto py-16 px-2 grid">
      {!isParamsPresent ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className=" flex flex-col gap-3 text-center pb-12">
            <h1 className=" text-4xl font-semibold">Reset password</h1>
            <p className=" text-sm text-[#666]">
              Enter your new password below
            </p>
          </div>
          <div className="w-full max-w-[350px] mx-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              className="flex flex-col gap-9 w-full"
            >
              {(formik) => (
                <Form className="grid gap-3 w-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword">
                      {formik.touched.newPassword &&
                      formik.errors.newPassword ? (
                        <p className=" text-red-600">
                          {formik.errors.newPassword}
                        </p>
                      ) : (
                        "New password"
                      )}
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      autoComplete="true"
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                      className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <p className=" text-red-600">
                          {formik.errors.confirmPassword}
                        </p>
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
                      className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
                    />
                  </div>
                  <button
                    type="submit"
                    className=" bg-[#33A077] hover:bg-[#227356] py-3  px-1 text-white rounded-lg mt-4 w-full"
                  >
                    Change Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </main>
  );
}
