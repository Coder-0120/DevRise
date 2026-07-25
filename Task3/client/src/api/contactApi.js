import axiosClient from "./axiosClient";

const contactApi = {
  send: (payload) => axiosClient.post("/contact", payload).then((res) => res.data),

  // -- admin --
  getAll: () => axiosClient.get("/contact/getAll").then((res) => res.data?.data ?? []),
  remove: (id) => axiosClient.delete(`/contact/delete/${id}`).then((res) => res.data),
};

export default contactApi;
