import axios from "axios";

const baseURL = "http://localhost:3001";

export const ApiAxiosInterceptor = axios.create({
  baseURL: baseURL,
});
