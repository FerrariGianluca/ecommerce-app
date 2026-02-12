import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import { Link } from 'react-router-dom';
import ProductoItem from '../components/ProductoItem';
import { useProductsContext } from '../context/ProductsContext';
import { FaSearch } from "react-icons/fa";

function Productos() {
    const { productos, cargando, error,cargarProductos } = useProductsContext();
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 12;

    const productosFiltrados = productos.filter(producto => {
      const texto = busqueda.toLowerCase();
      return (
        producto.producto.toLowerCase().includes(texto) ||
        producto.tipo?.toLowerCase().includes(texto)
      )
    })

    const lista = busqueda ? productosFiltrados : productos;

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto)

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

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
        <div className='position-relative'>
          <input 
            type='text'
            placeholder='Buscar por nombre o categoría...'
            className='form-control'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span><FaSearch className='position-absolute top-50 end-0 translate-middle-y me-3' /></span>
        </div>
        <small className='text-muted'>
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </small>
        <div className='container-productos'>
            {productosActuales.length > 0 ?
              productosActuales.map(producto=>(
                <ProductoItem key={producto.id} producto={producto}/>
              )
            ) : (
              <div className='text-center my-5 text-muted'>No se encontraron productos</div>
            )}
        </div>
        {productosFiltrados.length > productosPorPagina && (
          <div className='d-flex justify-content-center my-4'>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setPaginaActual(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
        <Link to="/"><button>Volver al Inicio</button></Link>
      </div>
    )
}

export default Productos