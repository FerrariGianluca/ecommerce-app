import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function EditarProductos() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const productoOriginal = state.producto;

    const [producto, setProducto] = useState({...productoOriginal});
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState({});

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setProducto(prev => ({ ...prev, [name]: value }));
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

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if(!validarFormulario()) return;
        setCargando(true);
        try{
            const productoAEnviar = {
                ...producto,
                precio: producto.precio.replace(',', '.')
            };
            const respuesta = await fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${producto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoAEnviar)
            });
            if(!respuesta.ok) throw new Error('Error al actualizar');
            alert('Producto actualizado correctamente');
            navigate(`/productos/${producto.id}`);
        }
        catch(error){
            alert('Error al actualizar el producto');
            console.error(error);
        }
        finally{
            setCargando(false);
        }
    }

    const cancelarEdicion = () => {
        alert('Edición cancelada');
        navigate('/productos');
    }

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px'}}>
            <h2>Editar Producto</h2>
            <form onSubmit={manejarEnvio}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        name="producto"
                        value={producto.producto}
                        onChange={manejarCambio}
                        className={`add-input ${errores.nombre ? 'red-border' : 'normal-border'}`}
                    />
                    {errores.nombre && <p className='error'>{errores.nombre}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={manejarCambio}
                        rows="4"
                        maxLength='200'
                        placeholder='Máximo 200 caracteres.'
                        className={`add-input ${errores.descripcion ? 'red-border' : 'normal-border'}`}
                        style={{resize: 'vertical'}}
                    />
                    <div className='input-info'>{producto.descripcion.length}/200 caracteres</div>
                    {errores.descripcion && <p className='error'>{errores.descripcion}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Tipo:</label>
                    <input
                        type="text"
                        name="tipo"
                        value={producto.tipo}
                        onChange={manejarCambio}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Precio:</label>
                    <input
                        type="text"
                        name="precio"
                        value={producto.precio}
                        onChange={manejarCambio}
                        placeholder="Ej: 40.000 o 40.000,50"
                        className={`add-input ${errores.precio ? 'red-border' : 'normal-border'}`}
                    />
                    <div className='input-info'>Formato argentino: punto para miles, sin decimales.</div>
                    {errores.precio && <p className='error'>{errores.precio}</p>}
                </div>

                <div>
                <label>Stock:</label>
                <input 
                    type="number"
                    name='stock'
                    value={producto.stock}
                    onChange={manejarCambio}
                    placeholder='Ej: 23'
                    className={`add-input ${errores.stock ? 'red-border' : 'normal-border'}`}
                />
                {errores.stock && <p className='error'>{errores.stock}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Imagen (URL):</label>
                    <input
                        type="text"
                        name="img"
                        value={producto.img}
                        onChange={manejarCambio}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        disabled={cargando}
                        className={`add-button ${cargando ? 'cargando' : 'not-cargando'}`}
                        style={{cursor: cargando ? 'not-allowed' : 'pointer'}}
                    >
                        {cargando ? 'Actualizando...' : 'Confirmar Cambios'}
                    </button>
                    <button
                        type="button"
                        onClick={cancelarEdicion}
                        className={`add-button`}
                        style={{backgroundColor: '#6c757d'}}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditarProductos