import axios from "axios";
import { CustomError } from "@/app/utils/CustomError";
import { ApiAxiosInterceptor } from "@/app/react-query/axios";
import { IDeleteAccount } from "../types-interfaces";

export const deleteAccount = async(data: IDeleteAccount) => {
    try {
        const response = await ApiAxiosInterceptor.delete("/api/users/", { data });
        if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new CustomError(response);
    }
    } catch(error) {
        if (axios.isAxiosError(error) && error?.response) {
      throw new CustomError(error.response);
    } else {
      throw error;
    }
    }
}
