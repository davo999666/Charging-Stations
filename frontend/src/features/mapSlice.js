import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    position: null, // [lat, lng] or null
    zoom: 13,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
        setPosition: (state, action) => {
            state.position = action.payload;
        },
        clearPosition: (state) => {
            state.position = null;
        },
    },
});

export const { setPosition, clearPosition ,setZoom} = mapSlice.actions;
export default mapSlice.reducer;
