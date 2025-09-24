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
            query: (station_id) => ({
                url: `/start/${station_id}`,
                method: "POST",
            }),
            invalidatesTags: ["ChargeHistory"],
        }),

        // POST /stop
        stopCharge: builder.mutation({
            query: (station_id) => ({
                url: `/stop/${station_id}`,
                method: "POST",
            }),
            invalidatesTags: ["ChargeHistory"],
        }),

        // GET /history (user’s own history)
        getUserHistory: builder.query({
            query: (station_id) => `/history/user/${station_id}`,
            providesTags: ["ChargeHistory"],
        }),

        // GET /history/station (admin only)
        getStationHistory: builder.query({
            query: (stationId) => `/history/station?station_id=${stationId}`,
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
