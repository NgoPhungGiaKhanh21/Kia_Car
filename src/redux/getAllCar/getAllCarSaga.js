import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { getAllCarApi } from "../../services/getAllCarApi";
import { getAllCarFailure, getAllCarSuccess, getAllCarRequest } from "./getAllCarSlice";


function* getAllCarHandler(action) {
    try {
        const response = yield call(getAllCarApi, action.payload);

        const data = response.data;

        yield put(getAllCarSuccess(data));

    } catch (error) {
        yield put(getAllCarFailure(error.message));
        toast.error("Failed to fetch all car");
    }
}

export function* watchGetAllCar() {
    yield takeLatest(getAllCarRequest.type, getAllCarHandler);
}
