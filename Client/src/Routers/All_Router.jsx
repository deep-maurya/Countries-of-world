// src/routers/All_Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ForgetPasswordPage } from '../Pages/ForgetPasswordPage';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { PageNotFoundPage } from '../Pages/PageNotFoundPage';
import { RegisterPage } from '../Pages/RegisterPage';
import PrivateRoute from './PrivateRoute';


export const All_Router = () => {
  return (

    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/forget_password/:token' element={<ForgetPasswordPage />} />
      <Route path='*' element={<PageNotFoundPage />} />
    </Routes>
   
  );
};
