import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function RutaProtegida({ children, rolesPermitidos=[] }) {
    const location = useLocation();
    const { isAuthenticated, authLoading, usuario } = useAuthContext();
    if (authLoading) return null;
    if(!isAuthenticated){
        return <Navigate to='/login' state={{ from: location.pathname }} replace />  
    }
    if(rolesPermitidos.length>0 && !rolesPermitidos.includes(usuario?.rol)){
        return <Navigate to="/productos" replace />;
    }
    return children;
}

export default RutaProtegida