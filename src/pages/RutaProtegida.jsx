import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function RutaProtegida({ children, adminOnly = false }) {
    const location = useLocation();
    const { isAuthenticated, authLoading, isAdmin } = useAuthContext();
    if (authLoading) return <p>Cargando...</p>;
    if(!isAuthenticated) return <Navigate to='/login' state={{ from: location.pathname }} replace />
    if(adminOnly && !isAdmin) return <Navigate to="/productos" replace />;
    return children;
}

export default RutaProtegida