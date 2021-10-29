import { parseCookies, setCookie, destroyCookie } from "nookies";
import { COOKIE_CONFIG } from "../config/constants";

export function formatTime(mTime) {
  const { hours, minutes } = mTime.toObject();
  return `${hours}:${minutes}`;
}

const key = "user";

export const storeUser = (user) => {
  setCookie(null, key, String(user), COOKIE_CONFIG);
};

export const getUser = () => {
  const { user } = parseCookies();
  return user;
};

export const removeUser = () => {
  destroyCookie(null, key);
};

export const storeToken = (token) =>
  setCookie(null, "token", token, COOKIE_CONFIG);

export const getToken = () => {
  const { token } = parseCookies();
  return token;
};

export const removeToken = () => {
  destroyCookie(null, "token");
};
