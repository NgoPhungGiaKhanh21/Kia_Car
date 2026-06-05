import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    createAppointment: null
}

const createAppoinmentSlice = createSlice({
    name: "createAppoinment",
    initialState,
    reducers: {
        createAppointmentRequest(state) {
            state.loading = true;
        },
        createAppointmentSuccess(state, action) {
            state.loading = false;
            state.createAppointment = action.payload;
        },
        createAppointmentFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    },

})

export const { createAppointmentRequest, createAppointmentSuccess, createAppointmentFailure } = createAppoinmentSlice.actions;

export default createAppoinmentSlice.reducer