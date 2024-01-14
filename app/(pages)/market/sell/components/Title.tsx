import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
}
export default function ProductTitle({ formik }: ProductTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title">
        {formik.touched.title && formik.errors.title ? (
          <p className=" text-red-600">{formik.errors.title}</p>
        ) : (
          "Product Name"
        )}
      </label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
      />
    </div>
  );
}

{
  /* <div className="flex flex-col gap-2">
            <label htmlFor="title">
              {formik.touched.title && formik.errors.title ? (
                <p className=" text-red-600">{formik.errors.title}</p>
              ) : (
                "Product Name"
              )}
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
          </div> */
}
