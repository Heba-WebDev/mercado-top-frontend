import axios from "axios";
import { CustomError } from "@/app/utils/CustomError";
import { ISignIn } from "..";

export const signInUser = async (data: ISignIn) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/signin",
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
