import axios from "axios";

const URL = process.env.BASE_URL as string;

export const ApiAxiosInterceptor = axios.create({
  //baseURL: "https://mercado-top.onrender.com",
  baseURL: "http://localhost:3001",
});
