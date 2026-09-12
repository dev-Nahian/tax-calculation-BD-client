import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { TaxProvider } from './context/TaxContext';
import { ToastProvider } from './components/common/Toast';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <TaxProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </TaxProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
