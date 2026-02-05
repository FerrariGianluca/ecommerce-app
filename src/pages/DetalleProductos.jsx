import { Link, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function DetalleProductos(){
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setCargando(true);
                setError(null);
                const res = await fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${id}`);
                if (!res.ok) throw new Error(`Error ${res.status}`);
                const data = await res.json();
                setProducto(data);
            }
            catch(e) {
                setError('No se pudo cargar el producto');
                console.error(e);
            }
            finally {
                setCargando(false);
            }
        }
        fetchProducto();
    }, [id]);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if(!producto){
        return (
            <div>
                <p>No se pudo cargar el producto</p>
                <Link to="/productos">
                    <button>Volver a la lista de productos</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container-md py-3">
            <h2 mb-3>Detalles del Producto</h2>
            <div className="row align-items-start g-0 mb-4">
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body align-items-center text-center p-2">
                            <img className="img-fluid rounded w-75" src={producto.img || '/no-image.jpg'} alt={producto.producto}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = '/no-image.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body p-1">
                            <h4 className="text-primary mb-2">{producto.producto}</h4>
                            <div className="mb-2">
                                {!producto.descripcion.trim() ? (
                                    <p>Sin descricpión</p>
                                ) : (
                                    <>
                                        <strong>Descripción:</strong>
                                        <p className="card-text mb-1">{producto.descripcion}</p>
                                    </>
                                )}
                            </div>
                            <div className="mb-2">
                                <strong>Tipo:</strong>
                                <span className="badge bg-secondary ms-1">{producto.tipo}</span>
                            </div>
                            <div>
                                <strong>Precio:</strong>
                                <h5 className="text-success d-inline ms-1">${producto.precio}</h5>
                            </div>
                            <div>
                                <strong>ID:</strong>
                                <span>{producto.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/productos">
                <BotonEstilizado>Volver</BotonEstilizado>
            </Link>
        </div>
    )
}

export default DetalleProductos

// Nombre de variable, styled.{nombre de etiqueta}, literales ``
const BotonEstilizado = styled.button`
    background: white;
    color: black;
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    &:hover {
        background: #31312eff;
        color: white;
    }
`