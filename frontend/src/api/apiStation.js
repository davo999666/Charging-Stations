// src/api/stationApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {base_url} from "../config/constante.js";
import Cookies from "js-cookie";

export const stationApi = createApi({
    reducerPath: "stationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${base_url}/stations`, // adjust if needed
        prepareHeaders: (headers) => {
            const token = Cookies.get("token"); // or Cookies.get("token")
            if (token) {
                headers.set("authorization", token);
            }
            return headers;
        },
    }),
    tagTypes: ["Station"],
    endpoints: (builder) => ({
        // GET /all (no auth required, optional basicAuth handled on backend)
        getAllStations: builder.query({
            query: () => "/all",
            providesTags: ["Station"],
        }),

        // GET /:id (requires authentication)
        getStationById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Station", id }],
        }),

        // POST /add (requires admin auth)
        addStation: builder.mutation({
            query: (newStation) => ({
                url: "/add",
                method: "POST",
                body: newStation,
            }),
            invalidatesTags: ["Station"],
        }),

        // PUT /update/:id (requires admin auth)
        updateStation: builder.mutation({
            query: ({ id, restData }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: {restData},
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Station", id }],
        }),

        // DELETE /delete/:id (requires admin auth)
        deleteStation: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Station", id }],
        }),
    }),
});

export const {
    useGetAllStationsQuery,
    useGetStationByIdQuery,
    useAddStationMutation,
    useUpdateStationMutation,
    useDeleteStationMutation,
} = stationApi;
