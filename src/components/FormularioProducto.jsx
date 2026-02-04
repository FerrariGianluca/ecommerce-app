import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
import "../styles/formulario-producto.css"

function FormularioProducto() {
    const navigate = useNavigate();
    const location = useLocation();
    const { agregarProducto, editarProducto, validar } = useProductsContext();
    
    const productoRecibido = location.state?.producto;
    const modo = productoRecibido ? "editar" : "agregar";
    
    const [producto, setProducto] = useState({
        id: '',
        producto: '',
        precio: '',
        descripcion: '',
        tipo: '',
        img: ''
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (modo === "editar" && productoRecibido) {
            setProducto({
                id: productoRecibido.id || '',
                producto: productoRecibido.producto || '',
                precio: productoRecibido.precio || '',
                descripcion: productoRecibido.descripcion || '',
                tipo: productoRecibido.tipo || '',
                img: productoRecibido.img || ''
            });
        }
    }, [modo, productoRecibido]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        if (name === 'descripcion' && value.length > 200) return;
        setProducto(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }));
    };

    const validarFormulario = () => {
        const resultado = validar(producto);
        setErrores(resultado.errores);
        return resultado.esValido;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) return;
        setCargando(true);
        
        try {
            const productoEnviar = { ...producto, precio: producto.precio.toString().replace(',', '.') };

            if (modo === "agregar") {
                const nuevoProducto = await agregarProducto(productoEnviar);
                alert(`Producto "${nuevoProducto.producto}" agregado correctamente con ID: ${nuevoProducto.id}`);

                setProducto({
                      id: '',
                      producto: '',
                      precio: '',
                      descripcion: '',
                      tipo: '',
                      img: ''
                });
                navigate(`/productos/${nuevoProducto.id}`);
            } else {
                await editarProducto(productoEnviar);
                alert('Producto actualizado correctamente');    
                navigate(`/productos/${producto.id}`);
            }
            setErrores({});
        } catch (error) {
            alert(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const cancelar = () => {
        navigate('/productos');
    };

    return (
        <form onSubmit={manejarEnvio} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>{modo === "editar" ? 'Editar' : 'Agregar'} Producto</h2>

            {modo === "editar" && productoRecibido && (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                    Editando: {productoRecibido.producto} (ID: {productoRecibido.id})
                </p>
            )}

            {/* Campo Nombre */}
            <div className='input-container'>
                <label className='input-title'>
                    Nombre: *
                </label>
                <input
                    type="text"
                    name="producto"
                    value={producto.producto}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className={`add-input ${errores.nombre ? 'red-border' : 'normal-border'}`}
                    placeholder="Ingrese el nombre del producto"
                />
                {errores.nombre && <p className='error'>{errores.nombre}</p>}
            </div>

            {/* Campo Precio */}
            <div className='input-container'>
                <label className='input-title'>
                    Precio: *
                </label>
                <input
                    type="text"
                    name="precio"
                    value={producto.precio}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="Ej: 40.000"
                    inputMode="decimal"
                    className={`add-input ${errores.nombre ? 'red-border' : 'normal-border'}`}
                />
                <div className='input-info'>
                    Formato argentino: punto para miles, sin decimales.
                </div>
                {errores.precio && <p className='error'>{errores.precio}</p>}
            </div>


            {/* Campo Tipo */}
            <div className='input-container'>
                <label className='input-title'>
                    Tipo:
                </label>
                <input
                    type="text"
                    name="tipo"
                    value={producto.tipo}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="Ej: Electrónica, Ropa, Hogar, etc."
                    className='add-input normal-border'
                />
            </div>

            {/* Campo img URL */}
            <div className='input-container'>
                <label className='input-title'>
                  Imagen (URL):
                </label>
                <input
                    type="text"
                    name="img"
                    value={producto.img}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="https://ejemplo.com/img.jpg"
                    className='add-input normal-border'
                />
            </div>

            {/* Campo Descripción */}
            <div className='input-container'>
                <label className='input-title'>
                    Descripción: *
                </label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={manejarCambio}
                    rows="4"
                    disabled={cargando}
                    maxLength="200"
                    placeholder="Máximo 200 caracteres"
                    className={`add-input ${errores.descripcion ? 'red-border' : 'normal-border'}`}
                    style={{resize: 'vertical'}}
                />
                <div className='input-info'>
                    {producto.descripcion.length}/200 caracteres
                </div>
                {errores.descripcion && (
                    <p className='error'>{errores.descripcion}</p>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button
                    type="submit"
                    disabled={cargando}
                    className={`add-button ${cargando ? 'cargando' : 'not-cargando'}`}
                >
                {cargando
                    ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
                    : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Producto')
                }
                </button>
            
                <button
                    type="button"
                    onClick={cancelar}
                    className='add-button cancelar'
                >
                    Cancelar
                </button>
            </div>
          
            <p>(*) Campos obligatorios</p>
        </form>
    );
} export default FormularioProducto;