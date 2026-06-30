import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../router/Appointment.js';

const app = express();

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes — must be before static files
app.use('/api/v1', router);

// Serve static frontend files from Frontend/pur_sakoon
app.use(express.static(path.join(__dirname, '../../Frontend/pur_sakoon')));

// Global JSON Error Handler — prevents HTML error pages
app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = (err as { statusCode?: number }).statusCode || 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

export default app;

