import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { iniciarSesion } = useAuthContext();
    const [form, setForm] = useState({nombre: '', password: ''});

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.nombre || !form.password) {
            alert("Completa todos los datos");
            return;
        }
        const isAdmin = iniciarSesion(form);
        const from = location.state?.from;
        const destino = isAdmin
          ? (from || "/dashboard")
          : (from && from !== "/dashboard" ? from : "/productos");
        navigate(destino, { replace: true });
    };
    return (
        <div>
            <h1>Inicia sesión para continuar</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Nombre Completo' 
                    value={form.nombre} 
                    onChange={e=>setForm({...form, nombre: e.target.value})} 
                    required 
                />
                <input 
                    type='password' 
                    placeholder='Contraseña' 
                    value={form.password} 
                    onChange={e=>setForm({...form, password: e.target.value})} 
                    required 
                />
                <button type='submit'>Iniciar Sesión</button>
                <strong> </strong>
                <button type='button' onClick={() => navigate(-1)}>Cancelar</button>
            </form>
        </div>
    )
}

export default Login