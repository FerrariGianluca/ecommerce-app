import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Navbar from './pages/Navbar';
import Productos from './pages/Productos';
import DetalleProductos from './pages/DetalleProductos';
import Carrito from './pages/Carrito';
import Pagar from './pages/Pagar';
import RutaProtegida from './pages/RutaProtegida';
import Login from './pages/Login';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import FormularioProducto from './components/FormularioProducto';
import EditarProductos from './components/EditarProductos';
import EliminarProductos from './components/EliminarProductos';

function App() {
  
  return (
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
            <Route path='/login' element={<Login />} />
            <Route path='/pagar' element={<RutaProtegida><Pagar /></RutaProtegida>} />
            <Route path='/dashboard' element={<RutaProtegida adminOnly={true}><Dashboard /></RutaProtegida>} />
            <Route path='/agregar-producto' element={<RutaProtegida adminOnly={true}><FormularioProducto /></RutaProtegida>} />
            <Route path='/editar-productos' element={<RutaProtegida adminOnly={true}><EditarProductos /></RutaProtegida>} />
            <Route path='/eliminar-productos' element={<RutaProtegida adminOnly={true}><EliminarProductos /></RutaProtegida>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App