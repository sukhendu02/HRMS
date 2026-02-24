import Employee from "../models/EmployeeModal.js";
const generateEmpId = async () => { 

    const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
    let newEmpId = "EMP001"; 
    

    if(!lastEmployee) {
        return newEmpId;
    }
    if (lastEmployee) {
        const lastEmpId = lastEmployee.employeeId;
        const numericPart = parseInt(lastEmpId.replace("EMP", ""));
        const newNumericPart = numericPart + 1;
        newEmpId = `EMP${newNumericPart.toString().padStart(3, "0")}`;
    }      
    return newEmpId;

};
export default generateEmpId;