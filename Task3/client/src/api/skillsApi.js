import axiosClient from "./axiosClient";

const skillsApi = {
  getAll: () => axiosClient.get("/skills").then((res) => res.data?.data ?? []),
};

export default skillsApi;
