import { post } from "../config/axios";

const Auth = {
  login: (data) => post("/login", data),
  register: (data) => post("/register", data),
};

export default Auth;
