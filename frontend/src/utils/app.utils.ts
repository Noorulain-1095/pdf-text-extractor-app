import { ChangeEvent, FormEvent } from 'react';
import { extractTextFromPDF } from '../services/apiService';
import { constants } from '../constants/app.constants'

//Uploads pdf file
export const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>, setFileURL: React.Dispatch<React.SetStateAction<string | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileURL(URL.createObjectURL(selectedFile));
  }
};

//Submits pdf file to get extracted text result
export const handleSubmit = (file: File | null, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setText: React.Dispatch<React.SetStateAction<string>>) => async (event: FormEvent) => {
  event.preventDefault();

  if (!file) {
    return;
  }

  setLoading(true);
  setError(null); // Reset error state
  setText(''); // Clear previous text

  try {
    const extractedText = await extractTextFromPDF(file);
    if(extractedText.data){
      setText(extractedText.data);
    }
    else{
      throw Error(extractedText)
    }
  } catch (error) {
    setError(constants.ERROR_MESSAGE); // Set error message
    console.error(constants.ERROR_MESSAGE, error);
  } finally {
    setLoading(false);
  }
};

// Copy all extracted text in textbox
export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  alert(constants.COPY_SUCCESS_MESSAGE);
};

// Downloads txt file of extracted content
export const handleDownload = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'extracted-text.txt';
  a.click();
  URL.revokeObjectURL(url);
};
