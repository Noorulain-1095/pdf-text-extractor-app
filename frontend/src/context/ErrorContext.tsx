import React, { createContext, useState, ReactNode } from 'react';
import CustomAlert from '../components/shared-components/CustomAlert';

interface ErrorContextProps {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const showError = (message: string) => {
    setError(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000); 
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <CustomAlert
        severity="error"
        message={error || ''}
        onClose={() => setShowAlert(false)}
        show={showAlert}
      />
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
