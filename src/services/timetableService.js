import api from "../api/axios";

export const getTimetable = async () => {
    const response = await api.get("/timetable");
    return response.data;
};

export const getSingleTimetable = async (id) => {
    const response = await api.get(`/timetable/${id}`);
    return response.data;
};

export const createTimetable = async (timetableData) => {
    const response = await api.post("/timetable", timetableData);
    return response.data;
};

export const updateTimetable = async (id, timetableData) => {
    const response = await api.put(`/timetable/${id}`, timetableData);
    return response.data;
};

export const deleteTimetable = async (id) => {
    const response = await api.delete(`/timetable/${id}`);
    return response.data;
};