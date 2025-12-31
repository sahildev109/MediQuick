import { addMedAPI, getMedAPI } from "../api/medicine.api";

export const addMed = async (data) => {
  return await addMedAPI(data);
};
export const getMed = async () => {
  return await getMedAPI();
};