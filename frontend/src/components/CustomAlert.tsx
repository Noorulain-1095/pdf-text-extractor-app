import React from 'react';
import { Alert, Box, Collapse } from '@mui/material';

interface CustomAlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  onClose: () => void;
  show: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message, onClose, show }) => {
  return (
    <Collapse in={show}>
      <Box position="absolute" top={0} right={0} m={2}>
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Box>
    </Collapse>
  );
};

export default CustomAlert;
