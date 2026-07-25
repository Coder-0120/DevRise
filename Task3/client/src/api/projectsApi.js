import axiosClient from "./axiosClient";

const projectsApi = {
  getAll: () => axiosClient.get("/projects").then((res) => res.data?.data ?? []),

  // -- admin --
  getOne: (id) => axiosClient.get(`/projects/${id}`).then((res) => res.data?.data),
  create: (payload) => axiosClient.post("/projects", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/projects/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/projects/${id}`).then((res) => res.data),
};

export default projectsApi;
