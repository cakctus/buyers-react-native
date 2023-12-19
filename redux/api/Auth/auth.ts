import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const serverUrl = "https://buyers.international"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (userDto) => ({
        url: "/api/login",
        method: "POST",
        body: userDto,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
