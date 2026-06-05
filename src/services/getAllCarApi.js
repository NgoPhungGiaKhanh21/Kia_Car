import api from "./api";

export const getAllCarApi = (data) => {
    return api.get("/cars", data);
}

export const createAppointmentApi = (data) => {
    return api.post("/appointments", data);
}