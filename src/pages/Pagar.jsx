import { useNavigate } from "react-router-dom"
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

function Pagar() {
    const navigate = useNavigate();
    const { carrito, vaciarCarrito, cantTotal } = useCartContext();
    const { usuario, cerrarSesion } = useAuthContext();

    const comprar = () => {
        alert('¡Compra realizada con éxito');
        navigate('/productos');
        vaciarCarrito();
    }

    return (
        <div>
            <div>
                <h2>{usuario.nombre}</h2>
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>

            <div>
                <h2>Tu compra:</h2>
                {carrito.map(producto => (
                    <div key={producto.id}>
                        <span>{producto.producto} x{producto.cant} - </span>
                        <strong>${(producto.precio * producto.cant).toFixed(2)}</strong>
                    </div>
                ))}
                <hr />
                <strong>Total: </strong><span>${precioTotal}</span>
            </div>

            <div>
                <button onClick={comprar}>Confirmar y Pagar</button>
                <button onClick={() => navigate('/carrito')}>Cancelar</button>
            </div>
        </div>
    )
}

export default Pagar