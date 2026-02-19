import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import '../styles/carrito.css';

function Carrito(){
    const { carrito, vaciarCarrito, precioTotal } = useCartContext();
    const { isAutenticated } = useAuthContext();
    const navigate = useNavigate();
    const irAPagar=()=>navigate('/pagar', {state: { carrito }});

    return (
        <div className="container my-4">
            {carrito.length === 0 ?
                <div className="empty-cart text-muted">
                    <h5 className="mb-2 fw-semibold">Tu carrito está vacío</h5>
                    <p className="mb-3 text-secondary">Agregá productos para empezar a comprar</p>
                    <button className="btn btn-primary" onClick={() => navigate('/productos')}>Ver productos</button>
                </div>
                : 
                (
                <>
                    <h2 className="mb-4 text-center">Carrito de Compras</h2>
                    <div className="card shadow-sm p-3 carrito-card">
                        <div className="carrito-lista">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Producto</th>
                                        <th>Precio Unitario</th>
                                        <th>Cantidad</th>
                                        <th>Precio Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.producto}</td>
                                            <td>${Number(item.precio).toFixed(2)}</td>
                                            <td>{item.cant}</td>
                                            <td>${Number(item.precio*item.cant).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-between align-items-center carrito-footer">
                            <h5 className="mb-0">Total: ${precioTotal}</h5>
                            <div className="d-flex gap-2">
                                <button className="btn btn-success" onClick={irAPagar}>Pagar</button>
                                <button className="btn btn-outline-danger" onClick={vaciarCarrito}>Vaciar</button>
                            </div>
                        </div>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default Carrito