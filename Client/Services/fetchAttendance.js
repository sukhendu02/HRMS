import api from "./api";

export const fetchEmployeeAttendance = async (employeeId) => {
  const response = await api.get(`/attendance/${employeeId}`);
  return response;
};