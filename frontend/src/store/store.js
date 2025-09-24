import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/apiUser.js"; // adjust path
import token from "../features/tokenSlice.js";
import { stationApi } from "../api/apiStation.js";
import mapReducer from "../features/mapSlice.js";
import {chargeHistoryApi} from "../api/apiHistory.js";

export const store = configureStore({
    reducer: {
        map: mapReducer,
        token,
        [stationApi.reducerPath]: stationApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [chargeHistoryApi.reducerPath]: chargeHistoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, stationApi.middleware, chargeHistoryApi.middleware),
});
