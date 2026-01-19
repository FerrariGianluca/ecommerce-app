import React from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

function Navbar() {
  const { carrito } = useCartContext();
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className='nav-item'>
              {isAuthenticated ? (
                <div>
                  <span>Hola, {usuario.nombre}</span>
                  <span>Carrito: {carrito.length}</span>
                  <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
              ) : (
                <Link className='nav-link' to='/iniciar-sesion'>Iniciar Sesión</Link>
              )}
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar