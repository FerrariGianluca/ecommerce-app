import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import '../styles/login.css';

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
        const rol = iniciarSesion(form);
        const from = location.state?.from;
        const destino = rol === 'admin'
          ? (from || "/dashboard")
          : (from && from !== "/dashboard" ? from : "/productos");
        navigate(destino, { replace: true });
    };
    return (
        <div className='login-container'>
            <h1 className='login-title'>Inicia sesión para continuar</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="login-inputs">
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
                </div>
                <div className='login-admin'>
                    <small><strong>Credenciales para admin</strong></small>
                    <small>Usuario: admin</small>
                    <small>Password: admin</small>
                </div>
                <div className="login-actions">
                    <button className='btn btn-success' type='submit'>Iniciar Sesión</button>
                    <button className='btn btn-danger' type='button' onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Login