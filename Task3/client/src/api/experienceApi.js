import axiosClient from "./axiosClient";

const experienceApi = {
  getAll: () => axiosClient.get("/experience").then((res) => res.data?.data ?? []),

  // -- admin --
  getOne: (id) => axiosClient.get(`/experience/${id}`).then((res) => res.data?.data),
  create: (payload) => axiosClient.post("/experience", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/experience/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/experience/${id}`).then((res) => res.data),
};

export default experienceApi;
