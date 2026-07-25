import axiosClient from "./axiosClient";

const certificatesApi = {
  getAll: () => axiosClient.get("/certificates").then((res) => res.data?.data ?? []),
};

export default certificatesApi;
