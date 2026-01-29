import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import noImage from '/no-image.jpg'

function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { sumarProducto, restarProducto, getCant } = useCartContext();
    const { isAdmin } = useAuthContext();

    useEffect(() => {
        const fetchProductos = async () => {
          try{
            setCargando(true);
            setError(null);
            const res = await fetch('https://695ad9991d8041d5eeb56822.mockapi.io/productos/products');
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setProductos(data);
          }
          catch(e) {
            setError('No se pudieron cargar los productos');
            console.error(e);
          }
          finally{
            setCargando(false);
          }
        }
        fetchProductos();
    }, []);

    if (cargando)
    return ( 
      <div className="container-carga">
        <img src='/spinner.gif' alt="Spinner" width="50px" />
        <p>Cargando...</p>
      </div>
    )
    if(error)
    return (
      <>
        <p>{error}</p>
        <button onClick={cargarProductos}>Reintentar</button>
      </>
    )

    return (
      <div className='container-page-productos'>
        <div className='container-productos'>
            {productos.map(producto=>(
              <div key={producto.id} className="card" style={{width: '18rem'}}>
                <img class="card-img-top" src={producto.img || noImage} alt={producto.producto}></img>
                <div className="card-body">
                  <div className='card-title'>
                    <h5>{producto.producto}</h5>
                    <p>{producto.descripcion}</p>
                  </div>
                  <ul className='card-list'>
                    <li><strong>Precio:</strong> ${producto.precio}</li>
                    <li><strong>Stock:</strong> {producto.stock}</li>
                    <li><strong>Agregados:</strong> {getCant(producto.id)}</li>
                  </ul>
                  <div className="card-actions">
                    <button className='btn btn-secondary' onClick={() => sumarProducto(producto)}>+</button>
                    <button className='btn btn-secondary' onClick={() => restarProducto(producto)}>-</button>
                  </div>
                  <Link to={`/productos/${producto.id}`}><button className='btn btn-success'>Ver detalles</button></Link>
                  {isAdmin && (
                    <div>
                      <button 
                        className='btn btn-primary'
                        onClick={() => navigate("/editar-productos", { state: {producto:producto}})}
                      >
                        Editar
                      </button>
                      <button 
                        className='btn btn-danger'
                        onClick={() => navigate("/eliminar-productos", { state: {producto:producto}})}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <Link to="/"><button>Volver al Inicio</button></Link>
      </div>
    )
}

export default Productos