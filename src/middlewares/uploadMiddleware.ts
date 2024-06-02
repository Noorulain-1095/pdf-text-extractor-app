// Middleware for handling file uploads
import multer from 'multer';

// Configure to store uploaded files in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage });
