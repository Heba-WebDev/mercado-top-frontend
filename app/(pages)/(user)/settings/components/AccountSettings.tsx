"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { countryList } from "@/app/utils/ListOfCountries";
import Select from "react-select";
import { FormValues, IModifySettings } from "../types-interfaces";
import { Form, Formik } from "formik";
import Spinner from "@/app/components/globals/Spinner";
import { useAppSelector, useAppDispatch } from "@/app/hooks/store";
import { IMAGE_URL } from "@/app/utils/ImageBaseURL";
import DeleteAccount from "./DeleteAccount";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { modifySettings } from "../api-settings";
import { CustomError } from "@/app/utils/CustomError";
import { updateUser } from "@/app/store/users/slice";

export default function AccountSettings() {
  const user = useAppSelector((state) => state.users);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation({
    mutationFn: modifySettings,
  });
  const initialValues: FormValues = {
    user_id: "",
    name: user[0].name,
    //username: "",
    email: user[0].email,
    password: "",
    //bio: "",
    country: user[0].country,
    profile_picture: null,
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
  useEffect(() => setIsMounted(true), []);
  const handleSubmit = async (values: IModifySettings) => {
    if (user && user[0] && user[0].user_id) {
      values.user_id = user[0].user_id;
    } else {
      console.error("user_id is not defined");
      return;
    }
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const indexableValues = values as { [key: string]: any };
      formData.append(key, indexableValues[key]);
    });

    try {
      const res = await mutateAsync(formData);
      toast.success(res?.message);
      dispatch(updateUser(res?.data?.usr));
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
    <section className="max-w-[750px] mx-auto mt-6">
      <h2 className="text-lg font-semibold">Account Settings</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {(formik) => (
          <Form className="grid gap-8">
            <div className="flex items-center justify-center gap-4 pt-6">
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
                    src={`${
                      user[0].profile_picture.startsWith("http") ||
                      user[0].profile_picture.startsWith("https")
                        ? user[0].profile_picture
                        : `${IMAGE_URL}${user[0].profile_picture}`
                    }`}
                    alt=""
                    width={80}
                    height={80}
                    style={{ height: "60px", width: "60px" }}
                    className="rounded-full object-cover"
                  />
                </>
              )}
              <label htmlFor="profile_picture" className="hidden">
                Upload a new avatar
              </label>
              <div className=" flex flex-col-reverse items-center gap-2">
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
              </div>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name as string}
                className="border py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                //onChange={formik.handleChange}
                //value={formik.values.username as string}
                className="border py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email as string}
                className="border py-3  px-2 rounded-lg focus:outline-[#33A077]"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.password as string}
                className="border py-3  px-2 rounded-lg focus:outline-[#33A077]"
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
                    className=" absolute top-12 right-4"
                  />
                ) : (
                  <Image
                    src="/images/globals/eye-slash.svg"
                    alt="show password"
                    width={20}
                    height={10}
                    className=" absolute top-12 right-4"
                  />
                )}
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="biod"
                //onChange={formik.handleChange}
                //value={formik.values.bio as string}
                className="border py-3 resize-none  px-2 rounded-lg focus:outline-[#33A077]"
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
              {isMounted && (
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
                        backgroundColor: "#f3f4f6",
                      },
                    }),
                  }}
                  className="border py-3  px-2 rounded-lg focus:outline-[#33A077]"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className={`${formik.isSubmitting ? "" : `bg-[#33A077]`} ${
                  formik.isSubmitting ? "" : "hover:bg-[#227356]"
                } px-4 py-2 text-white rounded-full`}
              >
                {formik.isSubmitting ? <Spinner /> : "Save Changes"}
              </button>
              {formik.isSubmitting ? (
                ""
              ) : (
                <button
                  type="button"
                  className=" border px-3 py-2 rounded-full"
                  onClick={() => {
                    formik.resetForm();
                    setSelectedAvatar(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <DeleteAccount />
          </Form>
        )}
      </Formik>
    </section>
  );
}
