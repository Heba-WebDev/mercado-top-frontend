"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
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

export default function SearchProducts() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async () => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className=" relative flex flex-col gap-4 w-full"
    >
      {(formik) => (
        <Form
          className="relative bg-white flex flex-col md:flex-row items-center w-full border
        p-3  mx-auto rounded-lg gap-4 md:gap-0"
        >
          <div className="w-full relative mr-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Search by product"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="pl-6 py-1 focus:outline-none w-full md:border md:border-y-0
            md:border-l-0"
            />
            <Image
              src="/images/market/glassmagnifying.svg"
              alt=""
              width={15}
              height={30}
              style={{ height: "auto" }}
              className=" absolute top-2 md:left-[1px]"
            />
          </div>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="true"
              placeholder="Seach by Location"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="pl-6 md:pl-7 py-1 focus:outline-none w-full"
            />
            <Image
              src="/images/market/MapPin.svg"
              alt=""
              width={15}
              height={30}
              style={{ height: "auto" }}
              className=" absolute top-2 md:left-1"
            />
          </div>
          <button
            type="submit"
            className="bg-white hover:bg-[#33A077] text-[#33A077]
             border-2 hover:border-transparent border-[#33A077] 
             py-3  px-1 hover:text-white md:max-w-[120px] w-full"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}
