import { constants } from '../constants/constants'

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
