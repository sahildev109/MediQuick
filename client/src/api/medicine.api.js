import api from "../config/axios";
export const addMedAPI = async(data) =>{
  const response = await api.post("/medicines", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
return response.data;
}


export const getMedAPI = async () => {

  const response = await api.get("/medicines");
  // console.log(response)
  return response.data;
};