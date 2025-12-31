import api from "../config/axios";
export const addMedAPI = async (formData) => {

  const response = await api.post("/medicines", formData);
  return response.data;
};

export const getMedAPI = async () => {

  const response = await api.get("/medicines");
  // console.log(response)
  return response.data;
};