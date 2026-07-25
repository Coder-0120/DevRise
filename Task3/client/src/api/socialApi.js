import axiosClient from "./axiosClient";

const socialApi = {
  get: () => axiosClient.get("/social").then((res) => res.data?.data ?? null),

  // -- admin --
  create: (payload) => axiosClient.post("/social", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/social/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/social/${id}`).then((res) => res.data),
};

export default socialApi;
