import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateCruncher } from './pages/CreateCruncher';
import { EditCruncher } from './pages/EditCruncher';
import { CruncherHistory } from './pages/CruncherHistory';
import { CruncherChat } from './pages/CruncherChat';
import { Settings } from './pages/Settings';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/crunchers/new" 
              element={
                <ProtectedRoute>
                  <CreateCruncher />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/crunchers/:id/edit" 
              element={
                <ProtectedRoute>
                  <EditCruncher />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/crunchers/:id/history" 
              element={
                <ProtectedRoute>
                  <CruncherHistory />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/crunchers/:id/chat" 
              element={
                <ProtectedRoute>
                  <CruncherChat />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect all other routes to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;