import React, { useState, useEffect } from 'react'
import '../styles/productos.css'
import { Link } from 'react-router-dom';
import ProductoItem from '../components/ProductoItem';
import { useProductsContext } from '../context/ProductsContext';

function Productos() {
    const { productos, cargando, error,cargarProductos } = useProductsContext();

    useEffect(() => {
      document.title = "Supermercado | Mi E-Commerce"

      // Función para actualizar meta tags
      const updateMetaTag = (name, content, attribute = 'name') => {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if(!meta){
          meta = document.createElement("meta");
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      }

      // Meta tags básicos
      updateMetaTag("description", "Explora los productos de nuestro supermercado online.");
      updateMetaTag("keywords", "supermercado, ecommerce, productos alimenticios, compras online");
      updateMetaTag("author", "Mi E-Commerce");
      updateMetaTag("robots", "index, follow");

      // Open Graph
      updateMetaTag("og:title", "Supermercado | Mi E-Commerce", "property");
      updateMetaTag("og:description", "Explora los productos de nuestro supermercado online.", "property");
      updateMetaTag("og:type", "website", "property");
      updateMetaTag("og:image", `${window.location.origin}/assets/carrito.png`, "property");
      updateMetaTag("og:url", window.location.href, "property");
    }, [])

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