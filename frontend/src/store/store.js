import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/apiUser.js";
import token from "../features/tokenSlice.js";
import { stationApi } from "../api/apiStation.js";
import mapReducer from "../features/mapSlice.js";
import { chargeHistoryApi } from "../api/apiHistory.js";
import chargingReducer from "../features/chargingSlice";
import station from "../features/stationSlice.js";

const rootReducer = combineReducers({
    map: mapReducer,
    token,
    charging: chargingReducer,
    station,
});

export const store = configureStore({
    reducer: {
        store: rootReducer,
        [stationApi.reducerPath]: stationApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [chargeHistoryApi.reducerPath]: chargeHistoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            stationApi.middleware,
            chargeHistoryApi.middleware
        ),
});
