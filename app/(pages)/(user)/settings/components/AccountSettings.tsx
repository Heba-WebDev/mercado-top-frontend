"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { countryList } from "@/app/utils/ListOfCountries";
import Select from "react-select";
import { FormValues } from "../types-interfaces";
import { Form, Formik } from "formik";
import Spinner from "@/app/components/globals/Spinner";
import { useAppSelector } from "@/app/hooks/store";
import { IMAGE_URL } from "@/app/utils/ImageBaseURL";
import DeleteAccount from "./DeleteAccount";
export default function AccountSettings() {
  const user = useAppSelector((state) => state.users);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const initialValues: FormValues = {
    user_id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    country: "",
    profile_img: null,
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
  const handleSubmit = () => {};
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
                  width={60}
                  height={30}
                  className="rounded-full"
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
                    objectFit="cover"
                    style={{ height: "80px", width: "80px" }}
                    className="rounded-full object-cover"
                  />
                </>
              )}
              <label htmlFor="profile_img" className="hidden">
                Upload a new avatar
              </label>
              <div className=" flex flex-col-reverse items-center gap-2">
                <input
                  id="profile_img"
                  name="profile_img"
                  type="file"
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.currentTarget.files) {
                      formik.setFieldValue(
                        "profile_img",
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
                    const inputElement = document.getElementById("profile_img");
                    if (inputElement) {
                      inputElement.click();
                    }
                  }}
                  className="bg-gray-100 border py-1 px-4 rounded-full focus:outline-[#33A077]"
                >
                  Update
                </button>
              </div>
              <button type="button">
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
                onChange={formik.handleChange}
                value={formik.values.username as string}
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
                onChange={formik.handleChange}
                value={formik.values.bio as string}
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
                className=" bg-[#33A077] hover:bg-[#227356] px-4 py-2 text-white rounded-full"
              >
                {formik.isSubmitting ? <Spinner /> : "Save Changes"}
              </button>
              <button type="button" className=" border px-3 py-2 rounded-full">
                Cancel
              </button>
            </div>
            <DeleteAccount />
          </Form>
        )}
      </Formik>
    </section>
  );
}
