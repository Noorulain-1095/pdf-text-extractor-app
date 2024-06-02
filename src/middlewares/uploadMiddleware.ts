// Middleware for handling file uploads
import multer from 'multer';

// Configured to store uploaded files in memory and check file size and type to protect from malicious file upload
const storage = multer.memoryStorage();
export const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed!'))
        }
        cb(null, true);
    }
});
