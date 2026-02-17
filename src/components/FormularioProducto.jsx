import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
import { toast } from "react-toastify";

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
    const [touched, setTouched] = useState(false);

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
      
        setTouched(true);
        if (!validarFormulario()) return;
        setCargando(true);
        
        try {
            const productoEnviar = { ...producto, precio: producto.precio.toString().replace(',', '.') };

            if (modo === "agregar") {
                const nuevoProducto = await agregarProducto(productoEnviar);
                toast.success(`Producto "${nuevoProducto.producto}" agregado correctamente con ID: ${nuevoProducto.id}`);

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
                toast.success('Producto actualizado correctamente');
                navigate(`/productos/${producto.id}`);
            }
            setErrores({});
        } catch (error) {
            toast.error(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const cancelar = () => {
        navigate('/productos');
    };

    return (
        <form onSubmit={manejarEnvio} className="card p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <div className="form-group">
                <h2>{modo === "editar" ? 'Editar' : 'Agregar'} Producto</h2>

                {modo === "editar" && productoRecibido && (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>
                        Editando: {productoRecibido.producto} (ID: {productoRecibido.id})
                    </p>
                )}

                {/* Campo Nombre */}
                <div>
                    <label htmlFor="producto">
                        Nombre: <strong>*</strong>
                    </label>
                    <input
                        type="text"
                        name="producto"
                        value={producto.producto}
                        onChange={manejarCambio}
                        disabled={cargando}
                        id="producto"
                        className={`form-control ${touched && errores.producto ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el nombre del producto"
                    />
                    <div className="invalid-feedback">{errores.producto}</div>
                </div>
            </div>

            {/* Campo Precio */}
            <div>
                <label htmlFor="precio">
                    Precio: <strong>*</strong>
                </label>
                <input
                    type="text"
                    name="precio"
                    value={producto.precio}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="Ej: 40.000"
                    inputMode="decimal"
                    id="precio"
                    className={`form-control ${touched && errores.precio ? 'is-invalid' : ''}`}
                />
                <div className='form-text'>
                    Formato argentino: punto para miles, sin decimales.
                </div>
                <div className="invalid-feedback">{errores.precio}</div>
            </div>


            {/* Campo Tipo */}
            <div>
                <label htmlFor="tipo">
                    Tipo:
                </label>
                <input
                    type="text"
                    name="tipo"
                    value={producto.tipo}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="Ej: Electrónica, Ropa, Hogar, etc."
                    id="tipo"
                    className='form-control'
                />
            </div>

            {/* Campo img URL */}
            <div>
                <label htmlFor="img">
                  Imagen (URL):
                </label>
                <input
                    type="text"
                    name="img"
                    value={producto.img}
                    onChange={manejarCambio}
                    disabled={cargando}
                    placeholder="https://ejemplo.com/img.jpg"
                    id="img"
                    className='form-control'
                />
            </div>

            {/* Campo Descripción */}
            <div className='form-group'>
                <label htmlFor="descripcion">
                    Descripción:
                </label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={manejarCambio}
                    rows="4"
                    disabled={cargando}
                    maxLength="200"
                    placeholder="Máximo 200 caracteres"
                    id="descripcion"
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    style={{resize: 'vertical'}}
                />
                <div className='form-text'>
                    {producto.descripcion.length}/200 caracteres
                </div>
                <div className="invalid-feedback">{errores.descripcion}</div>
            </div>

            <div className="d-flex gap-2 mb-3">
                <button
                    type="submit"
                    disabled={cargando}
                    className="btn btn-success w-100"
                >
                    {cargando
                        ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
                        : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Producto')
                    }
                </button>
                
                <button
                    type="button"
                    onClick={cancelar}
                    className="btn btn-outline-danger w-100"
                >
                    Cancelar
                </button>
            </div>
          
            <p className='form-text'>(*) Campos obligatorios</p>
        </form>
    );
} export default FormularioProducto;