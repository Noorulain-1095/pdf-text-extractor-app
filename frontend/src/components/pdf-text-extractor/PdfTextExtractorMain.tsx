import React, { useState, useContext, ChangeEvent, FormEvent  } from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import ErrorContext from '../../context/ErrorContext';
import { extractTextFromPDF } from '../../services/apiService';
import { constants } from '../../constants/constants'
import { handleCopy, handleDownload } from '../../utils/utils';

//components
import Header from './FileUploadHeader';
import ViewerContainer from './PdfViewerContainer';

const PdfTextExtractorMain: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [fileURL, setFileURL] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const context = useContext(ErrorContext);
  
    if (!context) {
      throw new Error('SomeComponent must be used within an ErrorProvider');
    }
  
    const { showError } = context;

    const handleFileChange = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
          setFile(selectedFile);
          setFileURL(URL.createObjectURL(selectedFile));
        } else {
          showError(constants.VALID_PDF_ERROR);
          // Clear the input value to remove the invalid file
          event.target.value = '';
        }
      }
    };
  
    const handleSubmit = async (
      event: FormEvent
    ) => {
      event.preventDefault();
  
      if (!file) {
        return;
      }
  
      setLoading(true);
      setText(''); // Clear previous text
  
      try {
        const extractedText = await extractTextFromPDF(file);
        if (extractedText.data) {
          setText(extractedText.data);
        } else {
          throw Error(extractedText);
        }
      } catch (error) {
        showError(constants.ERROR_MESSAGE); // Set error message
        console.error(constants.ERROR_MESSAGE, error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box my={4} position="relative">
          <Header 
          file={file} 
          handleSubmit={handleSubmit} 
          handleFileChange={handleFileChange} 
          />
          <ViewerContainer 
          text={text} 
          fileURL={fileURL} 
          loading={loading} 
          handleCopy={() => handleCopy(text)} 
          handleDownload={() => handleDownload(text)} 
          />
        </Box>
      </Container>
    </>
  );
};

export default PdfTextExtractorMain;
