import * as Yup from "yup";

export const sellFormValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Must be 6 characters or more"),
  description: Yup.string()
    .min(12, "Must be 12 characters or more")
    .required("Description is required"),
  price: Yup.number()
    .max(99000, "Must cost 99000 or less")
    .min(10, "Must cost 10 or more")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  photo_1: Yup.mixed().required("An image is required"),
});

