import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/agregar-producto.css'

function FormularioProducto() {
    const [producto, setProducto] = useState({producto: '', precio: '', descripcion: '', tipo: '', stock: ''});
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        if(name === 'producto' && value.length > 100) return;
        if(name === 'descripcion' && value.length > 200 ) return;
        if(name === 'tipo' && value.length > 50) return;
        if(name === 'stock' && value < 0) return;
        setProducto(prev => ({...prev, [name]: value}));
        if(errores[name]) setErrores(prev => ({...prev, [name]: ''}));
    }

    const validarFormulario = () => {
        const errorDeCarga = {};
        if(!producto.producto.trim()) errorDeCarga.nombre = 'El nombre es obligatorio.';
        if(!producto.precio.trim()) errorDeCarga.precio = 'El precio es obligatorio.';
        if(producto.stock==='') errorDeCarga.stock = 'El número de stock es obligatorio.';
        else {
            const precioLimpio = producto.precio.replace(/\./g, '').replace(',', '.');
            const precioNumerico = parseFloat(precioLimpio);
            if(!/^[\d.,]+$/.test(producto.precio.replace(/\./g, ''))) errorDeCarga.precio = 'Solo números, puntos o comas.';
            else if(isNaN(precioNumerico)) errorDeCarga.precio = 'Precio no válido.';
            else if(precioLimpio <= 0) errorDeCarga.precio = 'Debe ser mayor a 0.';
        }
        if(producto.descripcion.trim().length > 200) errorDeCarga.descripcion = 'Máximo 200 caracteres.';
        setErrores(errorDeCarga);
        return Object.keys(errorDeCarga).length === 0;
    }

    const agregarProducto = async (producto) => {
        try {
            const productoAEnviar = {...producto, precio: producto.precio.replace(',','.')}
            const respuesta = await fetch('https://695ad9991d8041d5eeb56822.mockapi.io/productos/products', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productoAEnviar)
            })
            if(!respuesta.ok) throw new Error('Error al agregar el producto.');
            const data = await respuesta.json();
            alert('Producto agregado correctamente');
            return data;
        } catch(error) {
            alert('Hubo un problema al agregar el producto.');
            throw error;
        }
    }

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if(!validarFormulario()) return;
        setCargando(true);
        try{
            const newProduct = await agregarProducto(producto);
            navigate(`/productos/${newProduct.id}`);
            setProducto({producto: '', precio: '', descripcion: '', tipo: '', stock: ''});
            setErrores({});
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    }

    return (
        <form className='add-form' onSubmit={manejarEnvio}>
            <h2>Agregar Producto</h2>
            <div className='input-container'>
                <label className='input-title'>Nombre: *</label>
                <input 
                    type="text" 
                    name="producto"
                    value={producto.producto}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className={`add-input ${errores.nombre ? 'red-border' : 'normal-border'}`}
                    placeholder='Ingrese el nombre del producto'
                />
                {errores.nombre && <p className='error'>{errores.nombre}</p>}
            </div>

            <div className='input-container'>
                <label className='input-title'>Descripción:</label>
                <input 
                    name='descripcion'
                    value={producto.descripcion}
                    onChange={manejarCambio}
                    rows='4'
                    disabled={cargando}
                    maxLength='200'
                    placeholder='Mínimo 10 caracteres, máximo 200.'
                    className={`add-input ${errores.descripcion ? 'red-border' : 'normal-border'}`}
                    style={{resize: 'vertical'}}
                />
                <div className='input-info'>{producto.descripcion.length}/200 caracteres</div>
                {errores.descripcion && <p className='error'>{errores.descripcion}</p>}
            </div>

            <div className='input-container'>
                <label className='input-title'>Tipo:</label>
                <input 
                    type="text"
                    name='tipo'
                    value={producto.tipo}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder='Ej: Verduras, frutas, frescos, etc.'
                    className='add-input normal-border'
                />
            </div>

            <div className='input-container'>
                <label className='input-title'>Precio: *</label>
                <input 
                    type="text"
                    name='precio'
                    value={producto.precio}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder='Ej: 40.000 o 40.000,50'
                    inputMode='decimal'
                    className={`add-input ${errores.precio ? 'red-border' : 'normal-border'}`}
                />
                <div className='input-info'>Formato argentino: punto para miles, sin decimales.</div>
                {errores.precio && <p className='error'>{errores.precio}</p>}
            </div>

            <div className='input-container'>
                <label className='input-title'>Stock: *</label>
                <input 
                    type="number"
                    name='stock'
                    value={producto.stock}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder='Ej: 23'
                    className={`add-input ${errores.stock ? 'red-border' : 'normal-border'}`}
                />
                {errores.stock && <p className='error'>{errores.stock}</p>}
            </div>

            <button type="submit" disabled={cargando} className={`add-button ${cargando ? 'cargando' : 'not-cargando'}`}>
                {cargando ? 'Agregando...' : 'Agregar Producto'}
            </button>
            <p>(*) Campos obligatorios</p>
        </form>
    )
}

export default FormularioProducto