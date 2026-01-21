import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const AUTH_TOKEN_KEY = 'authToken';

export const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            setAuthLoading(false);
            return;
        }
      
        try {
            const data = JSON.parse(token);
            setIsAuthenticated(true);
            setUsuario({
                nombre: data.nombre,
                rol: data.rol
            });
        } catch {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setIsAuthenticated(false);
        setUsuario(null);
        navigate('/login', { replace: true, state: {} });
    }

    const iniciarSesion = (usuario) => {
        const rol = usuario.nombre === 'admin' && usuario.password === 'admin' ? 'admin' : 'user';
        const tokenName = `${import.meta.env.VITE_FAKE_API_KEY}-${usuario.nombre}`;
        const token = JSON.stringify({
            tokenName,
            nombre: usuario.nombre,
            rol
        });
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        setIsAuthenticated(true);
        setUsuario({ nombre: usuario.nombre, rol });
        return rol;
    }

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,
        iniciarSesion,
        authLoading
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