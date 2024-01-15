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
  category_id: Yup.number().required("Category is required").notOneOf([0], "A category is required"),
  currency: Yup.number().required("A currency for the price is requried").notOneOf([0], "A currency for the price is required"),
  quantity: Yup.number().required("The quantity of the product is requried").notOneOf([0], "The quantity of the product is requried").min(1).max(3, "No more than 3 products of the same type can be sold at once"),
  photo_1: Yup.mixed().required("At least an image of the product is required"),
});

