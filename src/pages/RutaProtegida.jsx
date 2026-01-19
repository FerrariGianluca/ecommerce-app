import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function RutaProtegida({ children }) {
    const location = useLocation();
    const { isAuthenticated } = useAuthContext();
    if(!isAuthenticated) return <Navigate to='/iniciar-sesion' state={{ from: location.pathname }} replace />
    return children;
}

export default RutaProtegida