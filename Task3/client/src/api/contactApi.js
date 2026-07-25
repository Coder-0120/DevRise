import axiosClient from "./axiosClient";

const contactApi = {
  send: (payload) => axiosClient.post("/contact", payload).then((res) => res.data),
};

export default contactApi;
