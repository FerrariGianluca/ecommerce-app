import React from 'react'
import '../styles/productos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

function ProductoItem({producto}) {
    const navigate = useNavigate();
    const { sumarProducto, restarProducto, getCant } = useCartContext();
    const { isAdmin } = useAuthContext();
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-image-wrapper">
                  <img className="card-img-top" src={producto.img || '/no-image.jpg'} alt={producto.producto}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/no-image.jpg';
                    }}
                  />
                  {getCant(producto.id) > 0 && (
                    <span className="card-badge">
                      {getCant(producto.id)}
                    </span>
                  )}
                </div>
                <div className='card-title'>
                  <h5>{producto.producto}</h5>
                </div>
                <ul className='card-list'>
                  <li><strong>Precio:</strong> ${producto.precio}</li>
                  <li><strong>Stock:</strong> {producto.stock}</li>
                </ul>
                <div className="card-actions">
                  <button className='btn btn-secondary rounded-pill btn-sm' onClick={() => sumarProducto(producto)}>+</button>
                  <button className='btn btn-secondary rounded-pill btn-sm' onClick={() => restarProducto(producto)}>-</button>
                </div>
                <Link to={`/productos/${producto.id}`}><button className='btn btn-success'>Ver detalles</button></Link>
                {isAdmin && (
                  <div>
                    <button 
                      className='btn btn-primary'
                      onClick={() => navigate("/formulario-producto", { state: {producto:producto}})}
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
    )
}

export default ProductoItem