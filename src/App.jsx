import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaxProvider } from './context/TaxContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaxProvider>
          <AppRoutes />
        </TaxProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
