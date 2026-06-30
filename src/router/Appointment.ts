import { Router } from 'express';
import { appointmentController } from '../controller/Appointment.js';

const router = Router();

router.route('/send-appointment-email').post(appointmentController);

export default router;
