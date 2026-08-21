import api from "../api/axios";

export const login = async (userData) => {
    const response = await api.post("/login", userData);
    return response.data;
};

export const signup = async (userData) => {
    const response = await api.post("/signup", userData);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/me");
    return response.data;
};

