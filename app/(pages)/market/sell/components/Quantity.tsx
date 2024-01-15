import { FormikProps } from "formik";
import { FormValues } from "../interfaces/index";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
}

export default function Quantity({ formik }: ProductTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity">
        {formik.touched.quantity && formik.errors.quantity ? (
          <p className=" text-red-600">{formik.errors.quantity}</p>
        ) : (
          "Product Quantity"
        )}
      </label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.quantity}
        className="border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
      />
    </div>
  );
}
