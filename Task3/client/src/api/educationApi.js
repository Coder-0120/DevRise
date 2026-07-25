import axiosClient from "./axiosClient";

const educationApi = {
  getAll: () => axiosClient.get("/education").then((res) => res.data?.data ?? []),

  // -- admin --
  getOne: (id) => axiosClient.get(`/education/${id}`).then((res) => res.data?.data),
  create: (payload) => axiosClient.post("/education", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/education/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/education/${id}`).then((res) => res.data),
};

export default educationApi;
