// src/features/charging/chargingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chargingSlice = createSlice({
    name: "charging",
    initialState: {
        station: {},
        position: { lat: 0, lng: 0 },
        switch: false,
    },
    reducers: {
        setSwitch: (state) => {
            state.switch = !state.switch;
        },
        setStation: (state, action) => {
            state.station = action.payload; // payload = station object
        },
        setPosition: (state, action) => {
            state.position = action.payload; // payload = { x, y }
        },
        resetCharging: (state) => {
            state.station = {}
        },
    },
});

export const { setSwitch, setStation, setPosition, resetCharging } = chargingSlice.actions;
export default chargingSlice.reducer;
