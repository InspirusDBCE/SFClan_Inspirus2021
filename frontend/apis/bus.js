import { post } from "../config/axios";

const Bus = {
  add: (data) => post("/bus", data),
  nearby: (data) => post("/nearby", data),
};

export default Bus;
