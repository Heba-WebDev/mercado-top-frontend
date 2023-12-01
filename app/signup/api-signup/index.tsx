import { ISignUp } from "../types";
import axios from "axios";
import { CustomError } from "@/app/utils/CustomError";

export const signUpUser = async (data: ISignUp) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/signup",
      data
    );
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
