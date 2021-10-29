import axios from "axios";
import { API_BASE_URL as baseURL } from "./constants";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  headers,
  withCredentials: true,
  baseURL,
});

export default axiosInstance;

export const { get, post, put, delete: destroy } = axiosInstance;
