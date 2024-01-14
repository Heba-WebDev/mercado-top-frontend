import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
}

export default function Price({ formik }: ProductTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="price">
        {formik.touched.price && formik.errors.price ? (
          <p className=" text-red-600">{formik.errors.price}</p>
        ) : (
          "Product Price"
        )}
      </label>
      <input
        id="price"
        name="price"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.price}
        className="border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
      />
    </div>
  );
}

{
  /*

    <div className="flex flex-col gap-2">
            <label htmlFor="price">
              {formik.touched.price && formik.errors.price ? (
                <p className=" text-red-600">{formik.errors.price}</p>
              ) : (
                "Product Price"
              )}
            </label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
          </div>

*/
}
