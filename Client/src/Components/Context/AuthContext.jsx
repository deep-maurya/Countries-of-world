import React, { createContext, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import { Loading } from '../Utils/Loading';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token_select = 'auth_token';
      const authToken = Cookies.get(token_select);
      console.log(authToken)
      if (authToken) {
        try {
          const response = await AxioGet('token_verifys');
          console.log(response)
          setAuthUser(response.data.user);
          setAuthStatus(true);
        } catch (error) {
          console.error('Error verifying token:', error);
          setAuthStatus(false);
        //   navigate('/login');
        } finally {
          setLoading(false);
        }
      } else {
        setAuthStatus(false);
        // navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const logout = async () => {
    setAuthStatus(false);
    setAuthUser(null);
    try {
        await AxioGet('logout');
    } catch (error) {
        
    }
  };

  const loginUser = (userData) => {
    setAuthStatus(true);
    setAuthUser(userData);
  };

  return (
    <AuthContext.Provider value={{ authStatus, authUser, loading, logout, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
