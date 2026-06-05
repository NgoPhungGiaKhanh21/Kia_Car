import { all } from "redux-saga/effects";
import { watchGetAllCar } from "./getAllCar/getAllCarSaga";
import { watchCreateAppointment } from "./createAppointment/createAppointmentSaga";
export default function* rootSaga() {
  yield all([
    watchGetAllCar(),
    watchCreateAppointment()
  ]);
}
