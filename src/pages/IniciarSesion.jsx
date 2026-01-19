import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

function IniciarSesion() {
    const navigate = useNavigate();
    const ubicacion = useLocation();
    const { setIsAuthenticated, setUsuario } = useAuthContext();
    const [formulario, setFormulario] = useState({ nombre: '', email: ''});

    const manejarEnvio = e => {
        e.preventDefault();
        if(formulario.nombre && formulario.email){
            setIsAuthenticated(true);
            setUsuario(formulario);
            if(ubicacion.state?.from) navigate(ubicacion.state.from);
            else navigate('/productos');
        }else alert('Completa todos los datos')
    }
    return (
        <div>
            <h1>Inicia sesión para continuar</h1>
            <form onSubmit={manejarEnvio}>
                <input 
                    type='text' 
                    placeholder='Nombre Completo' 
                    value={formulario.nombre} 
                    onChange={e=>setFormulario({...formulario, nombre: e.target.value})} 
                    required 
                />
                <input 
                    type='email' 
                    placeholder='Email' 
                    value={formulario.email} 
                    onChange={e=>setFormulario({...formulario, email: e.target.value})} 
                    required 
                />
                <button type='submit'>Iniciar Sesión</button>
                <strong> </strong>
                <button type='button' onClick={() => navigate(-1)}>Cancelar</button>
            </form>
        </div>
    )
}

export default IniciarSesion