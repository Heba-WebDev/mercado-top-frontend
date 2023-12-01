import axios from "axios";

const URL = process.env.BASE_URL as string;

export const ApiAxiosInterceptor = axios.create({
  baseURL: "http://localhost:3001",
});
