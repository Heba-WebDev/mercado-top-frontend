import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
}

export default function Description({ formik }: ProductTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description">
        {formik.touched.description && formik.errors.description ? (
          <p className=" text-red-600">{formik.errors.description}</p>
        ) : (
          "Product Description"
        )}
      </label>
      <textarea
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        className="border resize-none focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
      />
    </div>
  );
}

{
  /*

<div className="flex flex-col gap-2">
            <label htmlFor="description">
              {formik.touched.description && formik.errors.description ? (
                <p className=" text-red-600">{formik.errors.description}</p>
              ) : (
                "Product Description"
              )}
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="border resize-none focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
          </div>

*/
}
