import { parseCookies, setCookie, destroyCookie } from "nookies";

export function formatTime(mTime) {
  const { hours, minutes } = mTime.toObject();
  return `${hours}:${minutes}`;
}

const key = "user";

export const storeUser = (user) => {
  setCookie(null, key, user, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getUser = () => {
  const { user } = parseCookies();
  return user;
};

export const removeUser = () => {
  destroyCookie(null, key);
};
