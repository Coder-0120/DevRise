import axiosClient from "./axiosClient";

const aboutApi = {
  // backend wraps the response as { success, data }, and getAbout() returns
  // an array (About.find()) even though there's only ever one profile record
  get: () =>
    axiosClient.get("/about").then((res) => {
      const payload = res.data?.data;
      return Array.isArray(payload) ? payload[0] : payload;
    }),

  // -- admin --
  // NOTE: the /about PUT & DELETE routes on the server don't take an :id
  // segment (they always act on the single About/profile record), so no id
  // is passed here even though other resources need one.
  create: (payload) => axiosClient.post("/about", payload).then((res) => res.data),
  update: (payload) => axiosClient.put("/about", payload).then((res) => res.data),
  remove: () => axiosClient.delete("/about").then((res) => res.data),
};

export default aboutApi;
