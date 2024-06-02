import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import { renderPage } from '../utils/pdfUtils';

// Types for the request file and parsed PDF data
interface UploadedFile {
  buffer: Buffer;
}

interface ParsedPDFData {
  text: string;
}

export const extractText = async (req: Request, res: Response) => {
  const file = req.file as UploadedFile;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
      data: null
    });
  }

  const options = {
    pagerender: renderPage
  };

  try {
    const data: ParsedPDFData = await pdfParse(file.buffer, options);
    res.status(200).json({
      success: true,
      message: 'PDF parsed successfully.',
      data: data.text
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error parsing PDF.',
      data: null
    });
  }
};
