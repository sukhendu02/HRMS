import api from "./api.js";


export const fetchEmployees = async () => {
  const response = await api.get("/employees/get-employees");
  console.log("API response for employees:", response);
  return response.data.data || [];
};