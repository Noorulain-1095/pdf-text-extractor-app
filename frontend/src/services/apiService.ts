import axios from 'axios';

export const BASE_URL = 'http://localhost:5001';

export const extractTextFromPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/api/extract-text`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
