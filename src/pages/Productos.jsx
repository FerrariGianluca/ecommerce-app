import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import imgCarrito from '../assets/carrito.png';
import spinner from '../assets/spinner.gif';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { sumarProducto, restarProducto, carrito } = useCartContext();

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
        <img src={spinner} alt="Spinner" width="50px" />
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

    const getCant = id => carrito.find(p => p.id === id)?.cant || 0;

    const carritoSuma = carrito.reduce((sum, item) => sum + item.cant, 0);

    return (
      <div className='container-page-productos'>
        <div className='container-productos'>
          <ol>
            {productos.map(producto=>(
              <li key={producto.id}>
                {producto.producto} - ${producto.precio} | Stock: {producto.stock} | Agregados: {getCant(producto.id)}
                  <button className='btn btn-success' onClick={() => sumarProducto(producto)}>+</button>
                  <button className='btn btn-danger' onClick={() => restarProducto(producto)}>-</button>
                  <Link to={`/productos/${producto.id}`} state={{producto}}><button className='btn btn-primary'>Ver Detalles</button></Link>
              </li> 
            ))}
          </ol>
        </div>
        <Link to="/"><button>Volver al Inicio</button></Link>
      </div>
    )
}

export default Productos