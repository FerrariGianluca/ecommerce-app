import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { iniciarSesion } = useAuthContext();
    const [form, setForm] = useState({nombre: '', password: ''});

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.nombre || !form.password) {
            toast.error("Completa todos los datos");
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
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='d-flex gap-3'>
                    <img src="/favicon.svg" className='img-carrito' alt="mi e-commerce" /><span>Mi E-Commerce</span>
                </h1>
                <div className="login-inputs">
                    <div className='login-input'>
                        <label htmlFor="">Nombre Completo</label>
                        <input 
                            type='text' 
                            value={form.nombre} 
                            onChange={e=>setForm({...form, nombre: e.target.value})} 
                        />
                    </div>
                    <div className='login-input'>
                        <label htmlFor="">Contraseña</label>
                        <input 
                            type='password' 
                            value={form.password} 
                            onChange={e=>setForm({...form, password: e.target.value})} 
                        />
                    </div>
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