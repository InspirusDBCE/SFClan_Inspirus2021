import axios from "axios";
import { API_BASE_URL as baseURL } from "./constants";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getToken, removeToken, removeUser } from "../utils";
import Router from "next/router";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  headers,
  baseURL,
});

const unauthorizedRequestHandler = async () => {
  console.error("Token probably expired, need to login again");

  // Clear auth data
  // removeUser();
  // removeToken();

  Router.push("/bus/login?logout=true");

  throw new Error("Token probably expired, need to login again");
};

createAuthRefreshInterceptor(axiosInstance, unauthorizedRequestHandler, {
  statusCodes: [401, 403],
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) config.headers["x-access-token"] = token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const { get, post, put, delete: destroy } = axiosInstance;
