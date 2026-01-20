import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState({ nombre: '', password: ''});

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario(null);
        navigate('/login', { replace: true, state: {} });
    }

    const iniciarSesion = (usuario) => {
        const rol = usuario.nombre === 'admin' && usuario.password === 'admin' ? 'admin' : 'user';
        setIsAuthenticated(true);
        setUsuario({...usuario, rol});
        return rol === 'admin';
    }

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,
        iniciarSesion
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