import asyncHandler from '../utils/Ascyhandler.js';
import nodemailer from 'nodemailer';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Request, Response } from 'express';

interface AppointmentBody {
    fullName: string;
    phoneNumber: string;
    email: string;
    serviceNeeded: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
}

const appointmentController = asyncHandler(async (req: Request, res: Response) => {
    const {
        fullName,
        phoneNumber,
        email,
        serviceNeeded,
        preferredDate,
        preferredTime,
        message,
    } = req.body as AppointmentBody;

    if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !serviceNeeded ||
        !preferredDate ||
        !preferredTime ||
        !message
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.DOCTOR_EMAIL,
        subject: 'New Appointment Request',
        html: `
      <h2>New Appointment Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${serviceNeeded}</p>
      <p><strong>Preferred Date:</strong> ${preferredDate}</p>
      <p><strong>Preferred Time:</strong> ${preferredTime}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    });

    return res.status(200).json(
        new ApiResponse(200, null, 'Appointment request sent successfully.')
    );
});

export { appointmentController };
