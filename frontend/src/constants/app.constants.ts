export const constants = {
  ALERT_TIMEOUT: 60000, // 1 minute
  ERROR_MESSAGE: 'Error extracting text from PDF',
  COPY_SUCCESS_MESSAGE: 'Text copied to clipboard',
  NO_PDF_UPLOADED: 'No PDF uploaded. Please upload a PDF to extract text.',
  VALID_PDF_ERROR: "Please select a valid PDF file."
};

export interface HeaderProps {
    handleSubmit: (event: React.FormEvent) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
}

export interface ViewerContainerProps {
    fileURL: string | null;
    text: string;
    loading: boolean;
    handleCopy: () => void;
    handleDownload: () => void;
  }