import axiosClient from "./axiosClient";

const educationApi = {
  getAll: () => axiosClient.get("/education").then((res) => res.data?.data ?? []),
};

export default educationApi;
