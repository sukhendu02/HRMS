
import express from 'express';

const app = express();
const router = express.Router();

import { createEmployee,getEmployees,deleteEmployee } from '../Controllers/EmpController.js';

router.post('/create-employee', createEmployee);
router.get('/get-employees', getEmployees);
router.delete('/delete-employee/:empId', deleteEmployee);

export default router;