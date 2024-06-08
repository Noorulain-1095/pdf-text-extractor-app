import React, { useState, useContext } from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import './App.css';

// services
import { handleFileChange, handleSubmit, handleCopy, handleDownload } from './utils/app.utils'
import ErrorContext from '../src//context/ErrorContext';

//components
import Header from './components/Header';
import ViewerContainer from './components/ViewerContainer';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('SomeComponent must be used within an ErrorProvider');
  }

  const { showError } = context;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box my={4} position="relative">
          <Header handleSubmit={handleSubmit(file, setLoading, showError, setText)} handleFileChange={handleFileChange(setFile, setFileURL,showError)} file={file} />
          <ViewerContainer fileURL={fileURL} text={text} loading={loading} handleCopy={() => handleCopy(text)} handleDownload={() => handleDownload(text)} />
        </Box>
      </Container>
    </>
  );
};

export default App;