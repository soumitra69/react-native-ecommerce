import React, { createContext, useState, useCallback, useMemo } from 'react';
import { storage } from '../utils/helper';
import { AVATAR_PLACEHOLDER } from '../constants/Images';

const AUTH_STORAGE_KEY = 'stylish_auth_user_v1';

const DEFAULT_PROFILE = {
  name: 'Abhiraj Sisodiya',
  email: 'aashifa@gmail.com',
  phone: '9876543210',
  pincode: '450116',
  address: '216 St Pauls Rd, Ashok Nagar',
  city: 'Indore',
  state: 'Madhya Pradesh',
  country: 'India',
  bankAccount: '204356XXXXXXX',
  accountHolder: 'Abhiraj Sisodiya',
  ifscCode: 'SBIN00428',
  avatar: AVATAR_PLACEHOLDER,
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = storage.getItem(AUTH_STORAGE_KEY, null);
    return saved || DEFAULT_PROFILE;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = useCallback((emailInput, _password) => {
    const trimmedEmail = (emailInput || '').trim() || DEFAULT_PROFILE.email;
    const displayName = trimmedEmail.includes('@')
      ? trimmedEmail.split('@')[0].replace(/[._-]/g, ' ')
      : trimmedEmail;

    setUser((prev) => {
      const updated = {
        ...prev,
        email: trimmedEmail,
        name: prev.name || displayName,
      };
      storage.setItem(AUTH_STORAGE_KEY, updated);
      return updated;
    });
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const signup = useCallback((emailInput, _password) => {
    const trimmedEmail = (emailInput || '').trim();
    const displayName = trimmedEmail.includes('@')
      ? trimmedEmail.split('@')[0].replace(/[._-]/g, ' ')
      : trimmedEmail || DEFAULT_PROFILE.name;

    const newUser = {
      ...DEFAULT_PROFILE,
      email: trimmedEmail || DEFAULT_PROFILE.email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
    };
    setUser(newUser);
    storage.setItem(AUTH_STORAGE_KEY, newUser);
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      storage.setItem(AUTH_STORAGE_KEY, updated);
      return updated;
    });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      signup,
      updateProfile,
      logout,
    }),
    [user, isAuthenticated, login, signup, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
