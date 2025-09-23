import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/apiUser.js"; // adjust path
import token from "../features/tokenSlice.js";
import { stationApi } from "../api/apiStation.js";

export const store = configureStore({
    reducer: {
        token,
        [stationApi.reducerPath]: stationApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, stationApi.middleware),
});
