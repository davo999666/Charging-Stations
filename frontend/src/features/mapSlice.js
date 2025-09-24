import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    position: null, // [lat, lng] or null
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload;
        },
        clearPosition: (state) => {
            state.position = null;
        },
    },
});

export const { setPosition, clearPosition } = mapSlice.actions;
export default mapSlice.reducer;
