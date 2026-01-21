import React from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import '../styles/navbar.css'
import imgCarrito from '../assets/carrito.png';

function Navbar() {
  const { cantTotal } = useCartContext();
  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        
        <Link className="navbar-brand" to="/">
          Mi E-Commerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
          </ul>
            <div className='navbar-data'>
              <Link to="/carrito" className='cart-container'>
                <div className='container-carrito'>
                  <img src={imgCarrito} alt="Carrito" className='img-carrito'/>
                </div>
                {cantTotal > 0 && <span className='carrito-badge'>({cantTotal})</span>}
              </Link>
              {isAuthenticated ? (
              <>
                <span className='navbar-user'>Hola, {usuario.nombre}</span>
                <button className='btn btn-danger' onClick={cerrarSesion}>Cerrar Sesión</button>
              </>
              ) : (
                <Link className='btn btn-success' to='/login'>Iniciar Sesión</Link>
              )}
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar