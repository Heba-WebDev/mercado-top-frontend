
import axios from "axios";
import { CustomError } from "@/app/utils/CustomError";
import { ApiAxiosInterceptor } from "@/app/react-query/axios";

export const getAllProducts = async () => {
  try {
    const response = await ApiAxiosInterceptor.get("/api/products");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error?.response) {
      throw new CustomError(error.response);
    } else {
      throw error;
    }
  }
};
