import React from 'react';
import '../styles/Header.css';
import CustomButton from './CustomButton';
import { Typography, Paper, Box } from '@mui/material';
import { constants,HeaderProps } from '../constants/app.constants';

const Header: React.FC<HeaderProps> = ({ handleSubmit, handleFileChange, file }) => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom className="header-title">
        PDF Text Extractor
      </Typography>
      <Paper elevation={3} className="header-container">
        <form onSubmit={handleSubmit}>
          <Box className="button-container form-container">
            <CustomButton variant="contained" component="label">
              Upload PDF
              <input type="file" accept="application/pdf" hidden onChange={handleFileChange} required />
            </CustomButton>
            <CustomButton type="submit" variant="contained" color="primary" disabled={!file}>
              Extract Text
            </CustomButton>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default Header;
