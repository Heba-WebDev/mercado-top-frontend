import { ApiAxiosInterceptor } from "@/app/react-query/axios";
import { IResetPassword } from "../types";
import { CustomError } from "@/app/utils/CustomError";

export const ResetPasswordFn = async (data: IResetPassword) => {
  try {
    const response = await ApiAxiosInterceptor.post(
      "/api/users/resetPassword",
      data
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    throw error;
  }
};
