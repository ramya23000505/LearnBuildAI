import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => apiService.getToken());
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot'

  // Initialize Auth State on Mount
  useEffect(() => {
    async function initAuth() {
      const storedToken = apiService.getToken();
      if (storedToken) {
        try {
          const userData = await apiService.getCurrentUser();
          if (userData) {
            setUser(userData);
            setToken(storedToken);
            await storageService.loadFromAPI();
          } else {
            apiService.removeToken();
            setToken(null);
          }
        } catch (e) {
          apiService.removeToken();
          setToken(null);
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const openLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const openForgotPassword = () => {
    setAuthMode('forgot');
    setAuthModalOpen(true);
  };

  const closeModal = () => {
    setAuthModalOpen(false);
  };

  const handleLogin = async (email, password) => {
    const data = await apiService.login(email, password);
    setUser(data.user);
    setToken(data.token);
    setIsGuest(false);
    setAuthModalOpen(false);
    await storageService.loadFromAPI();
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await apiService.register(name, email, password);
    setUser(data.user);
    setToken(data.token);
    setIsGuest(false);
    setAuthModalOpen(false);
    await storageService.loadFromAPI();
    return data;
  };

  const handleResetPassword = async (email, newPassword) => {
    const data = await apiService.resetPassword(email, newPassword);
    setUser(data.user);
    setToken(data.token);
    setIsGuest(false);
    setAuthModalOpen(false);
    await storageService.loadFromAPI();
    return data;
  };

  const handleLogout = () => {
    apiService.removeToken();
    setUser(null);
    setToken(null);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setAuthModalOpen(false);
  };

  const value = {
    user,
    token,
    isLoggedIn: !!user,
    isGuest,
    loading,
    authModalOpen,
    authMode,
    setAuthMode,
    openLogin,
    openSignup,
    openForgotPassword,
    closeModal,
    login: handleLogin,
    register: handleRegister,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    continueAsGuest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
