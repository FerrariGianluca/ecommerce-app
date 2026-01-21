import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

function Carrito(){
    const { carrito, vaciarCarrito, precioTotal } = useCartContext();
    const { isAutenticated } = useAuthContext();
    const navigate = useNavigate();
    const irAPagar=()=>navigate('/pagar', {state: { carrito }});

    return (
        <div>
            <hr />
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ?
                (<p>El carrito está vacío</p>) 
                : 
                (
                    <>
                        <table>
                            <thead>
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
                        <div>
                            <hr />
                            Total: ${precioTotal}
                        </div>

                        <button onClick={vaciarCarrito}>Vaciar Carrito</button>
                        <button onClick={irAPagar}>Pagar</button>
                    </>
                )
            }
        </div>
    )
}

export default Carrito