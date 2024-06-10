import React from 'react';
import '../../styles/ViewerContainer.css';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { constants, ViewerContainerProps } from '../../constants/constants';
import { Box, Typography, Paper, CircularProgress, IconButton } from '@mui/material';

const ViewerContainer: React.FC<ViewerContainerProps> = ({ fileURL, text, loading, handleCopy, handleDownload }) => {
  return (
    <Box mt={4} className="viewer-container">
      {/* Display PDF or Default Message */}
      {fileURL ? (
        <iframe
          src={fileURL}
          title="PDF Viewer"
          className="pdf-viewer"
        ></iframe>
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1" color="textSecondary">
            {constants.NO_PDF_UPLOADED}
          </Typography>
        </Box>
      )}

      {text && (
        <Paper elevation={3} className="text-output">
          {/* Display Loader or Extracted Text */}
          {loading ? (
            <Box className="loader-container">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="pre-header-container">
                <Typography variant="h6" component="h2">
                  Extracted Text:
                </Typography>
                <Box>
                  <IconButton onClick={handleCopy} color="primary">
                    <FileCopyIcon />
                  </IconButton>
                  <IconButton onClick={handleDownload} color="primary">
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Box>
              <pre className="pre-container">{text}</pre>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ViewerContainer;
