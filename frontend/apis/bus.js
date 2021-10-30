import { get, post } from "../config/axios";

const Bus = {
  add: (data) => post("/bus", data),
  nearby: (data) => post("/nearby", data),
  fetch: () => get("/userbus"),
};

export default Bus;
