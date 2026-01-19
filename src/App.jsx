import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Navbar from './pages/Navbar';
import Productos from './pages/Productos';
import DetalleProductos from './pages/DetalleProductos';
import Carrito from './pages/Carrito';
import Pagar from './pages/Pagar';
import RutaProtegida from './pages/RutaProtegida';
import IniciarSesion from './pages/IniciarSesion';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
        <div className="layout">
          <Navbar />
          <main className="content">
            <div className="page">
              <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/servicios' element={<Servicios />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/productos/:id' element={<DetalleProductos />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/iniciar-sesion' element={<IniciarSesion />} />
                <Route path='/pagar' element={<RutaProtegida><Pagar /></RutaProtegida>} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App