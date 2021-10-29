import { post } from "../config/axios";

const Bus = {
  add: (data) => post("/bus", data),
};

export default Bus;
