import { combineReducers } from "@reduxjs/toolkit";
import getAllCarReducer from "./getAllCar/getAllCarSlice"
import createAppoinmentReducer from "./createAppointment/createAppoinmentSlice"

const rootReducer = combineReducers({
  getAllCar: getAllCarReducer,
  createAppointment: createAppoinmentReducer
});
export default rootReducer;
