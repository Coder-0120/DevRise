import axiosClient from "./axiosClient";

const skillsApi = {
  getAll: () => axiosClient.get("/skills").then((res) => res.data?.data ?? []),

  // -- admin --
  getOne: (id) => axiosClient.get(`/skills/${id}`).then((res) => res.data?.data),
  create: (payload) => axiosClient.post("/skills", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/skills/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/skills/${id}`).then((res) => res.data),
};

export default skillsApi;
