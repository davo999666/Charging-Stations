// src/api/chargeHistoryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {base_url} from "../config/constante.js";
import Cookies from "js-cookie";

export const chargeHistoryApi = createApi({
    reducerPath: "chargeHistoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${base_url}/charging`, // adjust if needed
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) {
                headers.set("authorization", token);
            }
            return headers;
        },
    }),
    tagTypes: ["ChargeHistory"],
    endpoints: (builder) => ({
        // POST /start
        startCharge: builder.mutation({
            query: (data) => ({
                url: "/start",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ChargeHistory"],
        }),

        // POST /stop
        stopCharge: builder.mutation({
            query: (data) => ({
                url: "/stop",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ChargeHistory"],
        }),

        // GET /history (user’s own history)
        getUserHistory: builder.query({
            query: () => "/history",
            providesTags: ["ChargeHistory"],
        }),

        // GET /history/station (admin only)
        getStationHistory: builder.query({
            query: () => "/history/station",
            providesTags: ["ChargeHistory"],
        }),
    }),
});

export const {
    useStartChargeMutation,
    useStopChargeMutation,
    useGetUserHistoryQuery,
    useGetStationHistoryQuery,
} = chargeHistoryApi;
