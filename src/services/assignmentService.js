import api from "../api/axios";

export const getAssignments = async () => {
    const response = await api.get("/assignments");
    return response.data;
};

export const createAssignment = async (assignmentData) => {
    const response = await api.post("/assignments", assignmentData);
    return response.data;
};

export const updateAssignment = async (id, assignmentData) => {
    const response = await api.put(`/assignments/${id}`, assignmentData);
    return response.data;
};

export const deleteAssignment = async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
};