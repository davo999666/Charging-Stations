// src/features/stations/stationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stations: [],
    filteredStations: [],
};

const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {
        setStations: (state, action) => {
            state.stations = action.payload;
            state.filteredStations = [];
        },
        filterStations: (state, action) => {
            const { city, types = [], status } = action.payload;

            state.filteredStations = state.stations.filter((station) => {
                const cityMatch = !city || station.city === city;
                const typeMatch = types.length === 0 || types.includes(station.type);
                const statusMatch = !status || station.status === status;
                return cityMatch && typeMatch && statusMatch;
            });
        },
        resetStations: (state) => {
            state.filteredStations = []; // back to full list
        },
    },
});

export const { setStations, filterStations, resetStations } = stationSlice.actions;
export default stationSlice.reducer;
