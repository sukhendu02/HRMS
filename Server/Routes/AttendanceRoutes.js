
import express from 'express';

const app = express();
const router = express.Router();

import {updateAttendance ,getAttendance} from '../Controllers/AttendanceController.js';
router.post('/update-attendence', updateAttendance);
router.get('/:employeeId', getAttendance);

export default router;