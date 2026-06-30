import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../router/Appointment.js';

const app = express();

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS: Vercel deployment + localhost support
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes — must be before static files
app.use('/api/v1', router);

// ✅ Serve static frontend files — localhost ke liye zaroori
// Vercel pe yeh Vercel CDN se directly serve hoga (faster)
app.use(express.static(path.join(__dirname, '../../Frontend/pur_sakoon')));

// SPA fallback — koi bhi route index.html serve kare (Express 5 syntax)
app.get('{*splat}', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Frontend/pur_sakoon', 'index.html'));
});

// ✅ Global JSON Error Handler — prevents HTML error pages
app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = (err as { statusCode?: number }).statusCode || 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

export default app;
