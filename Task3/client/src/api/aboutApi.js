import axiosClient from "./axiosClient";

const aboutApi = {
  // backend wraps the response as { success, data }, and getAbout() returns
  // an array (About.find()) even though there's only ever one profile record
  get: () =>
    axiosClient.get("/about").then((res) => {
      const payload = res.data?.data;
      return Array.isArray(payload) ? payload[0] : payload;
    }),
};

export default aboutApi;
