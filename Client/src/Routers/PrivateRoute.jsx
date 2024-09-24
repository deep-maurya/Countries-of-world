
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Components/Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { authStatus } = useContext(AuthContext);
    console.log(authStatus)
    return authStatus ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
