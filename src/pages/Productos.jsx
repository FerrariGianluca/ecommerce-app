import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import { Link } from 'react-router-dom';
import ProductoItem from '../components/ProductoItem';
import { useProductsContext } from '../context/ProductsContext';

function Productos() {
    const { productos, cargando, error,cargarProductos } = useProductsContext();

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
              <ProductoItem key={producto.id} producto={producto}/>
            ))}
        </div>
        <Link to="/"><button>Volver al Inicio</button></Link>
      </div>
    )
}

export default Productos