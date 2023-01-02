import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3100",
    prepareHeaders: (headers) => {
      const authToken = sessionStorage.getItem("authToken");
      authToken && headers.set("auth-token", authToken);
      return headers;
    },
  }),
  tagTypes: ["Posts", "Users", "Comments", "Notifications", "Stories"],
  endpoints: (builder) => ({}),
});
