import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { SendForgotPasswordEmail } from "../api-signin";
import { IForgotEmail } from "../types";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/app/components/globals/Spinner";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
interface FormValues {
  email: string;
}
interface Props {
  closeModal: () => void;
}

const ForgotPassModalOpen: React.FC<Props> = ({ closeModal }) => {
  const initialValues: FormValues = {
    email: "",
  };
  const { mutateAsync } = useMutation({
    mutationFn: SendForgotPasswordEmail,
    mutationKey: ["forgotPassword"],
  });
  const handleSubmit = async (
    values: IForgotEmail,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    try {
      const res = await mutateAsync(values);
      toast.success(res?.message);
      closeModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        toast(customError.response.data.message);
      }
    }
    setSubmitting(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-50"></div>
      <div className="bg-white border shadow-md p-5 z-10 w-full mx-2 md:mx-0 md:w-2/3 max-w-lg relative">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {(formik) => (
            <Form className="grid gap-3">
              <button onClick={closeModal}>
                <Image
                  src="/images/globals/close.svg"
                  alt="close"
                  width={25}
                  height={10}
                  style={{ width: "25px", height: "10px" }}
                  className=" absolute top-7 right-5 bg-white rounded-full"
                />
              </button>

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
                  className="bg-[#F0EDE8] py-3  px-2 rounded-lg focus:outline-[#33A077]"
                />
              </div>
              <button
                disabled={!formik.isValid || !formik.dirty}
                type="submit"
                className={`${
                  !formik.isValid || !formik.dirty
                    ? "bg-gray-500"
                    : "bg-[#33A077] hover:bg-[#227356]"
                } py-3  px-1 text-white rounded-lg mt-4 w-full`}
              >
                {formik.isSubmitting ? <Spinner /> : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassModalOpen;
