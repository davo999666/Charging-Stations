import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authApi } from "../api/apiUser.js"; // adjust path
import token from "../features/tokenSlice.js";
import { stationApi } from "../api/apiStation.js";
import mapReducer from "../features/mapSlice.js";
import {chargeHistoryApi} from "../api/apiHistory.js";
import chargingReducer from "../features/chargingSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const storeReducer = combineReducers({
    map: mapReducer,
    token,
    charging: chargingReducer,
});
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token", "charging"], // 👈 both will be saved
};
const persistedReducer = persistReducer(persistConfig, storeReducer);

export const store = configureStore({
    reducer: {
        store: persistedReducer,
        [stationApi.reducerPath]: stationApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [chargeHistoryApi.reducerPath]: chargeHistoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false,}).concat(authApi.middleware, stationApi.middleware, chargeHistoryApi.middleware),
});

export const persistor = persistStore(store);
