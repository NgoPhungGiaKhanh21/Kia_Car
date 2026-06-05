import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getAllCar: null,
    loading: false,
    error: null,
};

const getAllCarSlice = createSlice({
    name: "getAllCar",

    initialState,

    reducers: {
        getAllCarRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllCarSuccess(state, action) {
            state.loading = false;
            state.getAllCar = action.payload;
        },
        getAllCarFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { getAllCarRequest, getAllCarSuccess, getAllCarFailure } = getAllCarSlice.actions;

export default getAllCarSlice.reducer;