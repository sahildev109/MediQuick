import api from "../config/axios";

export const signupAPI = async (formData) => {

  const response = await api.post("/auth/signup", formData);
  return response.data;
};
export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
