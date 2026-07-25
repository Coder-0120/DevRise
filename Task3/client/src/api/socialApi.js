import axiosClient from "./axiosClient";

const socialApi = {
  get: () => axiosClient.get("/social").then((res) => res.data?.data ?? null),
};

export default socialApi;
