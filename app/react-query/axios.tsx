import axios from "axios";

const URL = process.env.BASE_URL as string;

export const ApiAxiosInterceptor = axios.create({
  baseURL: "https://spotless-gown-colt.cyclic.app",
});
