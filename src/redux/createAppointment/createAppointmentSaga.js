import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { createAppointmentApi } from "../../services/getAllCarApi";
import { createAppointmentFailure, createAppointmentRequest, createAppointmentSuccess } from "./createAppoinmentSlice";

function* createAppointmentHandler(action) {
    try {
        const response = yield call(createAppointmentApi, action.payload);

        const data = response.data;

        yield put(createAppointmentSuccess(data));

    } catch (error) {
        const errorMessage = error?.response.data?.message || "Failed to create appointment";
        yield put(createAppointmentFailure(errorMessage));
        toast.error(errorMessage);
    }
}

export function* watchCreateAppointment() {
    yield takeLatest(createAppointmentRequest.type, createAppointmentHandler);
}