import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { sumarProducto, restarProducto, getCant } = useCartContext();

    const cargarProductos = () => {
      setCargando(true);
      setError(null);

      fetch('https://695ad9991d8041d5eeb56822.mockapi.io/productos/products')
        .then(response=>{
          if(!response.ok)throw new Error('HTTP ' + response.status);
          return response.json()
        })
        .then(data=>{
          setProductos(data);
          setCargando(false);
        })
        .catch(error=>{
          setError('Hubo un problema al cargar los productos.');
          setCargando(false);
        })
    }

    useEffect(() => {
      cargarProductos()
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
                    <button className='btn btn-success' onClick={() => sumarProducto(producto)}>+</button>
                    <button className='btn btn-danger' onClick={() => restarProducto(producto)}>-</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Link to="/"><button>Volver al Inicio</button></Link>
      </div>
    )
}

export default Productos