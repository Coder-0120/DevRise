import axiosClient from "./axiosClient";

const projectsApi = {
  getAll: () => axiosClient.get("/projects").then((res) => res.data?.data ?? []),
};

export default projectsApi;
