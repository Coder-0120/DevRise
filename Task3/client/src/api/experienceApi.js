import axiosClient from "./axiosClient";

const experienceApi = {
  getAll: () => axiosClient.get("/experience").then((res) => res.data?.data ?? []),
};

export default experienceApi;
