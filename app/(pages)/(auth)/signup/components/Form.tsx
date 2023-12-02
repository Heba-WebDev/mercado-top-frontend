"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signUpUser } from "../api-signup";
import { ISignUp } from "../types";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { useRouter } from "next/navigation";
import { countryList } from "@/app/utils/ListOfCountries";
import Select from "react-select";

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
  const router = useRouter();

  const handleSubmit = async (values: ISignUp) => {
    try {
      const res = await mutateAsync(values);
      toast.success(res?.message);
      router.push("/signin");
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
        <Form className="grid gap-3">
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
            <Select
              id="country"
              name="country"
              options={countryList}
              onChange={(option) =>
                formik.setFieldValue("country", option?.value)
              }
              value={countryList.find(
                (option) => option.value === formik.values.country
              )}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#F0EDE8",
                  border: 0,
                  borderColor: state.isFocused ? "green" : provided.borderColor,
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
              className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-green-700"
            />
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
