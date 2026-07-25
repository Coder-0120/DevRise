import axiosClient from "./axiosClient";

const certificatesApi = {
  getAll: () => axiosClient.get("/certificates").then((res) => res.data?.data ?? []),

  // -- admin --
  getOne: (id) => axiosClient.get(`/certificates/${id}`).then((res) => res.data?.data),
  create: (payload) => axiosClient.post("/certificates", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/certificates/${id}`, payload).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/certificates/${id}`).then((res) => res.data),
};

export default certificatesApi;
