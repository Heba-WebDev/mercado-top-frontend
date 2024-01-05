"use client";
import Image from "next/image";
import { Form, Formik, Field, FieldInputProps, FormikProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../api-signup";
import { ISignUp } from "../types";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { useRouter } from "next/navigation";
import { countryList } from "@/app/utils/ListOfCountries";
import Select from "react-select";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/globals/Spinner";
import { useAppSelector } from "@/app/hooks/store";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be 2 characters or more")
    .required("Name is required"),
  username: Yup.string()
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Username can only contain letters, digits, underscore or a dash"
    )
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      "Username must contain letters and at least one digit"
    )
    .required("Username is required"),
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
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  profile_picture: File | null;
  terms: boolean;
}

export default function SignUpForm() {
  const user = useAppSelector((state) => state.users);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.length !== 0) {
      router.push("/market");
    }
    setLoading(false);
  }, [user, router]);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setConShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { mutateAsync } = useMutation({
    mutationFn: signUpUser,
    mutationKey: ["signup"],
  });
  const initialValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    profile_picture: null,
    terms: false,
  };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (values: ISignUp) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const indexableValues = values as { [key: string]: any };
      formData.append(key, indexableValues[key]);
    });
    try {
      const res = await mutateAsync(formData);
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
  useEffect(() => setIsMounted(true), []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      {(formik) => (
        <Form className="grid gap-3">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className=" text-sm">
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
              className="border pl-10 focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
            <Image
              src="/images/globals/user-form.svg"
              alt="name"
              width={30}
              height={30}
              style={{ width: "25px", height: "25px" }}
              className=" absolute top-[52%] left-2"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className=" text-sm">
              {formik.touched.username && formik.errors.username ? (
                <p className=" text-red-600">{formik.errors.username}</p>
              ) : (
                "Username"
              )}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="border pl-10 focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
            <Image
              src="/images/globals/user-edit.svg"
              alt="username"
              width={30}
              height={30}
              style={{ width: "25px", height: "25px" }}
              className=" absolute top-[52%] left-2 opacity-60"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pt-6">
            <label htmlFor="profile_picture" className="">
              Upload an avatar
            </label>

            <div className=" flex flex-col-reverse items-center ">
              <input
                id="profile_picture"
                name="profile_picture"
                type="file"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.currentTarget.files) {
                    formik.setFieldValue(
                      "profile_picture",
                      event.currentTarget.files[0]
                    );
                  }
                  handleAvatarChange(event);
                }}
                className="hidden bg-gray-100 w-full py-3 px-2 rounded-lg focus:outline-[#33A077]"
              />
              <div className=" flex items-center gap-2">
                {selectedAvatar && (
                  <Image
                    src={selectedAvatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ height: "60px", width: "60px" }}
                    className="rounded-full object-cover"
                  />
                )}
                {!selectedAvatar && (
                  <>
                    <Image
                      src={`/images/globals/user-form.svg`}
                      alt=""
                      width={80}
                      height={80}
                      style={{ height: "60px", width: "60px" }}
                      className="rounded-full object-cover border"
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const inputElement =
                      document.getElementById("profile_picture");
                    if (inputElement) {
                      inputElement.click();
                    }
                  }}
                  className="bg-gray-100 border py-1 px-4 rounded-full focus:outline-[#33A077]"
                >
                  Update
                </button>
                <button
                  type="button"
                  aria-label="Remove avatar"
                  onClick={() => setSelectedAvatar(null)}
                >
                  <Image
                    src="/images/globals/remove.svg"
                    alt="remove uploaded avatar"
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "auto" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className=" text-sm">
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
            <label htmlFor="password" className="text-sm">
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
              src="/images/globals/lock.svg"
              alt="name"
              width={30}
              height={30}
              style={{ width: "25px", height: "25px" }}
              className=" absolute top-[47%] left-2"
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
                  className="absolute top-[43px] right-4"
                />
              ) : (
                <Image
                  src="/images/globals/eye-slash.svg"
                  alt="show password"
                  width={20}
                  height={10}
                  className="absolute top-[43px] right-4"
                />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="confirmPassword" className="text-sm">
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
              type={showConfPassword ? "text" : "password"}
              autoComplete="true"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="border pl-10 focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
            <Image
              src="/images/globals/lock.svg"
              alt="name"
              width={30}
              height={30}
              style={{ width: "25px", height: "25px" }}
              className=" absolute top-[47%] left-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showConfPassword ? (
                <Image
                  src="/images/globals/eye.svg"
                  alt="show password"
                  width={20}
                  height={10}
                  className="absolute top-[43px] right-4"
                />
              ) : (
                <Image
                  src="/images/globals/eye-slash.svg"
                  alt="show password"
                  width={20}
                  height={10}
                  className="absolute top-[43px] right-4"
                />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-sm">
              {formik.touched.country && formik.errors.country ? (
                <p className=" text-red-600">{formik.errors.country}</p>
              ) : (
                "Country"
              )}
            </label>
            {isMounted && (
              <div className="relative">
                <Select
                  id={id}
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
                      backgroundColor: "",
                      border: 0,
                      borderColor: state.isFocused
                        ? "green"
                        : provided.borderColor,
                      boxShadow: state.isFocused
                        ? "0 0 0 1px green"
                        : provided.boxShadow,
                      paddingLeft: "20px",
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
                <Image
                  src="/images/globals/global.svg"
                  alt="name"
                  width={30}
                  height={30}
                  style={{ width: "25px", height: "25px" }}
                  className=" absolute top-[30%] left-2 opacity-50"
                />
              </div>
            )}
          </div>
          <Field name="terms" type="checkbox">
            {({
              field,
              form,
            }: {
              field: FieldInputProps<any>;
              form: FormikProps<any>;
            }) => (
              <div className="checkbox flex flex-col-reverse">
                <div>
                  <input type="checkbox" id="terms" {...field} />
                  <label htmlFor="terms" className="pl-2">
                    I agree to the{" "}
                    <span className="text-[#33A077]">Terms & Conditions</span>
                  </label>
                </div>
                {form.errors.terms && form.touched.terms ? (
                  <div className="text-red-600 pb-1">
                    {form.errors.terms as string}
                  </div>
                ) : null}
              </div>
            )}
          </Field>

          <button
            type="submit"
            className=" bg-[#33A077] hover:bg-[#227356] py-3  px-1 text-white rounded-lg mt-4 w-full"
          >
            {formik.isSubmitting ? <Spinner /> : "Sign up"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
