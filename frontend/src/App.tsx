import React, { useState, useEffect } from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import { constants } from './constants/app.constants';
import './App.css';

// services
import { handleFileChange, handleSubmit, handleCopy, handleDownload } from './utils/app.utils'

//components
import CustomAlert from './components/CustomAlert';
import Header from './components/Header';
import ViewerContainer from './components/ViewerContainer';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, constants.ALERT_TIMEOUT);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <CustomAlert
          severity="error"
          message={error || ''}
          onClose={() => setShowAlert(false)}
          show={showAlert}
        />
        <Box my={4} position="relative">
          <Header handleSubmit={handleSubmit(file, setLoading, setError, setText)} handleFileChange={handleFileChange(setFile, setFileURL)} file={file} />
          <ViewerContainer fileURL={fileURL} text={text} loading={loading} handleCopy={() => handleCopy(text)} handleDownload={() => handleDownload(text)} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;