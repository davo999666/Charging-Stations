// src/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {base_url} from "../config/constante.js";
import Cookies from "js-cookie";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${base_url}/users`, // change to your backend URL
        credentials: "include",// if you use cookies
        prepareHeaders: (headers, { endpoint }) => {
            const token = Cookies.get("token");
            if (token && endpoint !== "login") {
                headers.set("Authorization", token);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ login, password }) => ({
                url: "/login",
                method: "POST",
                body: {login, password},
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
        }),

        verification: builder.mutation({
            query: (data) => ({
                url: "/verification",
                method: "POST",
                body: data,
            }),
        }),

        sendEmailResetPassword: builder.mutation({
            query: ({ email: email }) => {
                return {
                    url: `/forgot-password/${email}`, // :login param
                    method: "POST",
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerificationMutation,
    useSendEmailResetPasswordMutation,
} = authApi;
