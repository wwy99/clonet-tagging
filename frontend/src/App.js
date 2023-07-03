import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import UserAuthentication from './UserAuthentication';
import UserCenter from './UserCenter';
import ImageTagging from './ImageTagging';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleAuthentication = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <UserAuthentication signUp={false} onAuthentication={handleAuthentication} />
              ) : (
                <Navigate to="/user-center" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <UserAuthentication signUp onAuthentication={handleAuthentication} />
              ) : (
                <Navigate to="/user-center" />
              )
            }
          />
          <Route
            path="/user-center"
            element={
              isAuthenticated ? (
                <UserCenter user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/image-tagging"
            element={
              isAuthenticated ? (
                <ImageTagging />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </I18nextProvider>
  );
}

export default App;
