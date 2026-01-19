import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState({ nombre: '', email: ''});

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario({ nombre: '', email: '' });
        navigate('/iniciar-sesion')
    }

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext debe usarse dentro de AuthProvider");
    return context;
}