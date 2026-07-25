import axiosClient from "./axiosClient";

const authApi = {
  login: (username, password) =>
    axiosClient.post("/auth/login", { username, password }).then((res) => res.data),
};

export default authApi;
