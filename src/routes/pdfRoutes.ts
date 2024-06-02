import { Router } from 'express';
import { extractText } from '../controllers/pdfController';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.post('/extract-text', upload.single('file'), extractText);

export default router;
